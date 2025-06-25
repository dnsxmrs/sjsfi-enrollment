// app/api/xr/user-access-lookup/route.ts
import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { rateLimiter } from "@/lib/limiter";
import { getClientIp } from "@/lib/ip";
import { z } from "zod";
import crypto from "crypto";

const SHARED_SECRET = process.env.SJSFI_SHARED_SECRET || "";
const VALID_API_KEYS = {
    // 'sis': process.env.SJSFI_SIS_API_KEY,
    lms: process.env.SJSFI_LMS_API_KEY,
    hrms: process.env.SJSFI_HRMS_API_KEY, // don't use self apikey
};

const schema = z.object({
    email: z.string().email(),
});

function verifySignature(
    body: string,
    timestamp: string,
    signature: string
): boolean {
    try {
        const hmac = crypto.createHmac("sha256", SHARED_SECRET);
        hmac.update(body + timestamp);
        const digest = hmac.digest("hex");
        console.log("[DEBUG] Signature verification:", {
            bodyLength: body.length,
            timestamp,
            expectedSignature: signature,
            computedDigest: digest,
            match: digest === signature,
        });
        return digest === signature;
    } catch (error) {
        console.error("[ERROR] Signature verification failed:", error);
        return false;
    }
}

export async function POST(request: NextRequest) {
    const requestId = crypto.randomUUID().slice(0, 8);
    console.log(`[${requestId}] POST /api/xr/getStudent called`);

    // Get client IP from headers
    const userIP = await getClientIp();
    console.log(`[${requestId}] Client IP: ${userIP}`);

    try {
        await rateLimiter.consume(userIP, 1);
        console.log(`[${requestId}] Rate limit check passed`);
    } catch (rateLimitError) {
        console.error(`[${requestId}] Rate limit exceeded for IP: ${userIP}`, {
            error: rateLimitError,
            errorType: "RATE_LIMIT_EXCEEDED",
        });
        return Response.json(
            {
                error: "Too many requests",
                requestId,
                timestamp: new Date().toISOString(),
            },
            { status: 429 }
        );
    }

    // Check for API key in the Authorization header and if it matches a valid trusted key
    const auth = request.headers.get("authorization") || "";
    const apiKey = auth.split(" ")[1];
    console.log(`[${requestId}] API key check:`, {
        authHeaderPresent: !!auth,
        apiKeyPresent: !!apiKey,
        apiKeyPrefix: apiKey ? apiKey.slice(0, 8) + "..." : null,
        validKeysCount: Object.values(VALID_API_KEYS).filter((k) => k).length,
    });

    if (!apiKey || !Object.values(VALID_API_KEYS).includes(apiKey)) {
        console.error(`[${requestId}] Unauthorized API key attempt`, {
            apiKeyProvided: !!apiKey,
            errorType: "UNAUTHORIZED_API_KEY",
        });
        return Response.json(
            {
                error: "Unauthorized",
                requestId,
                timestamp: new Date().toISOString(),
            },
            { status: 401 }
        );
    }
    const timestamp = request.headers.get("x-timestamp") || "";
    const signature = request.headers.get("x-signature") || "";

    console.log(`[${requestId}] Headers validation:`, {
        timestampPresent: !!timestamp,
        signaturePresent: !!signature,
        timestamp: timestamp || "missing",
    });

    const now = Date.now();
    const tsInt = parseInt(timestamp, 10);
    const timeDiff = Math.abs(now - tsInt);

    console.log(`[${requestId}] Timestamp validation:`, {
        serverTime: now,
        requestTime: tsInt,
        timeDifference: timeDiff,
        maxAllowed: 5 * 60 * 1000,
        isValid: !isNaN(tsInt) && timeDiff <= 5 * 60 * 1000,
    });

    if (!timestamp || !signature || isNaN(tsInt) || timeDiff > 5 * 60 * 1000) {
        console.error(`[${requestId}] Invalid request parameters`, {
            timestampMissing: !timestamp,
            signatureMissing: !signature,
            timestampInvalid: isNaN(tsInt),
            timestampExpired: timeDiff > 5 * 60 * 1000,
            errorType: "INVALID_REQUEST_PARAMS",
        });
        return Response.json(
            {
                error: "Invalid request",
                requestId,
                timestamp: new Date().toISOString(),
            },
            { status: 400 }
        );
    }

    const rawBody = await request.text();
    console.log(`[${requestId}] Request body received:`, {
        bodyLength: rawBody.length,
        bodyPreview: rawBody.slice(0, 100),
    });

    if (!verifySignature(rawBody, timestamp, signature)) {
        console.error(`[${requestId}] Invalid signature`, {
            bodyLength: rawBody.length,
            errorType: "INVALID_SIGNATURE",
        });
        return Response.json(
            {
                error: "Invalid signature",
                requestId,
                timestamp: new Date().toISOString(),
            },
            { status: 403 }
        );
    }
    let email: string;
    try {
        const parsed = schema.parse(JSON.parse(rawBody));
        email = parsed.email;
        console.log(`[${requestId}] Request parsed successfully:`, {
            email: email,
            emailValid: !!email,
        });
    } catch (parseError) {
        console.error(`[${requestId}] Request parsing failed:`, {
            error: parseError,
            rawBody: rawBody.slice(0, 200),
            errorType: "REQUEST_PARSE_ERROR",
            errorMessage:
                parseError instanceof Error
                    ? parseError.message
                    : "Unknown parse error",
        });
        return Response.json(
            {
                error: "Invalid request format",
                requestId,
                timestamp: new Date().toISOString(),
            },
            { status: 400 }
        );
    }

    if (!email) {
        console.error(`[${requestId}] Missing email in request`, {
            errorType: "MISSING_EMAIL",
        });
        return Response.json(
            {
                error: "Invalid request, contact the administrator for help.",
                requestId,
                timestamp: new Date().toISOString(),
            },
            { status: 400 }
        );
    }
    try {
        console.log(
            `[${requestId}] Starting database query for email: ${email}`
        );

        const user = await prisma.user.findFirst({
            where: { email: email },
            select: {
                id: true,
                firstName: true,
                email: true,
                role: true,
                student: {
                    select: {
                        gradeLevel: true,
                        status: true,
                        studentNumber: true,
                        dateOfBirth: true,
                        gender: true,
                        guardianName: true,
                        guardianContact: true,
                        address: true,
                    },
                },
            },
        });

        console.log(`[${requestId}] Database query completed:`, {
            userFound: !!user,
            userId: user?.id,
            userRole: user?.role,
            hasStudentData: !!user?.student,
        });

        if (!user) {
            console.log(`[${requestId}] User not found:`, {
                email,
                errorType: "USER_NOT_FOUND",
            });
            return Response.json(
                {
                    error: "Not found",
                    requestId,
                    timestamp: new Date().toISOString(),
                },
                { status: 404 }
            );
        }

        // Transform the response to flatten student data
        const transformedUser = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.firstName, // Assuming firstName is used for both
            email: user.email,
            role: user.role,
            // Student-specific fields (if user is a student)
            ...(user.student && {
                gradeLevel: user.student.gradeLevel,
                status: user.student.status,
                studentNumber: user.student.studentNumber,
                dateOfBirth: user.student.dateOfBirth,
                gender: user.student.gender,
                guardianName: user.student.guardianName,
                guardianContact: user.student.guardianContact,
                address: user.student.address,
            }),
        };
        console.log(`[${requestId}] User found and transformed successfully:`, {
            userId: transformedUser.id,
            userRole: transformedUser.role,
            hasStudentFields: !!(
                transformedUser as typeof transformedUser & {
                    gradeLevel?: string;
                }
            ).gradeLevel,
            responseSize: JSON.stringify(transformedUser).length,
        });

        return Response.json({
            ...transformedUser,
            requestId,
            timestamp: new Date().toISOString(),
        });
    } catch (dbError) {
        console.error(`[${requestId}] Database error occurred:`, {
            error: dbError,
            errorType: "DATABASE_ERROR",
            errorMessage:
                dbError instanceof Error
                    ? dbError.message
                    : "Unknown database error",
            errorStack: dbError instanceof Error ? dbError.stack : undefined,
            email: email,
        });

        return Response.json(
            {
                error: "Server error",
                requestId,
                timestamp: new Date().toISOString(),
                ...(process.env.NODE_ENV === "development" && {
                    debugInfo: {
                        errorMessage:
                            dbError instanceof Error
                                ? dbError.message
                                : "Unknown error",
                        errorType: "DATABASE_ERROR",
                    },
                }),
            },
            { status: 500 }
        );
    } finally {
        console.log(`[${requestId}] Request completed`);
        if (process.env.NODE_ENV === "development") {
            // await prisma.$disconnect();
        }
    }
}
