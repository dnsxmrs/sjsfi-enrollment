import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { rateLimiter } from "@/lib/limiter";
import { getClientIp } from "@/lib/ip";
import crypto from "crypto";

const SHARED_SECRET = process.env.SJSFI_SHARED_SECRET || "";
const VALID_API_KEYS = {
    lms: process.env.SJSFI_LMS_API_KEY,
};

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
    console.log(`[${requestId}] POST /api/xyz/getStudent called`);

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

    // Check for API key in the Authorization header
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

    try {
        // Parse the request body to get the email
        let requestData;
        try {
            requestData = JSON.parse(rawBody);
        } catch (parseError) {
            console.error(`[${requestId}] Failed to parse request body:`, parseError);
            return Response.json(
                {
                    error: "Invalid JSON in request body",
                    requestId,
                    timestamp: new Date().toISOString(),
                },
                { status: 400 }
            );
        }

        const { email } = requestData;
        if (!email) {
            console.error(`[${requestId}] Missing email in request body`);
            return Response.json(
                {
                    error: "Missing email in request body",
                    requestId,
                    timestamp: new Date().toISOString(),
                },
                { status: 400 }
            );
        }

        console.log(`[${requestId}] Looking up student with email:`, email);

        // Find the student by email
        const student = await prisma.user.findFirst({
            where: { 
                email: email,
                role: 'STUDENT'
            },
            select: {
                id: true,
                firstName: true,
                familyName: true,
                email: true,
                role: true,
                student: {
                    select: {
                        studentNumber: true,
                    },
                },
            },
        });

        if (!student) {
            console.log(`[${requestId}] Student not found for email:`, email);
            return Response.json(
                {
                    error: "Student not found",
                    requestId,
                    timestamp: new Date().toISOString(),
                },
                { status: 404 }
            );
        }

        console.log(`[${requestId}] Student found:`, {
            studentId: student.id,
            email: student.email,
            role: student.role,
        });

        // Return the student data with Role field (as expected by access.ts)
        return Response.json({
            Role: [student.role], // Wrap in array as expected by access.ts
            Student: {
                id: student.id,
                firstName: student.firstName,
                familyName: student.familyName,
                email: student.email,
                studentNumber: student.student?.studentNumber,
            },
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
    }
}
