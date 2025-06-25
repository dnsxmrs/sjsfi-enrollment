import { NextResponse } from "next/server";
import { clerkClient, currentUser } from "@clerk/nextjs/server";

export async function POST(request: Request) {
    try {
        console.log("🧪 Testing Clerk API role setting...");

        // Check environment variables
        const hasSecretKey = !!process.env.CLERK_SECRET_KEY;
        if (!hasSecretKey) {
            console.error("❌ Missing CLERK_SECRET_KEY environment variable");
            return NextResponse.json({
                success: false,
                error: "An internal error occurred. Please contact SJSFI Administration."
            }, { status: 500 });
        }

        // Parse request body
        let body;
        try {
            body = await request.json();
        } catch (parseError) {
            await logErrorWithRequestContext(parseError, request, "Failed to parse request body");
            return NextResponse.json({
                success: false,
                error: "Invalid request format. Please try again."
            }, { status: 400 });
        }

        const { role } = body;

        // Validate role input
        if (!role || typeof role !== 'string') {
            console.warn("❌ Invalid role provided:", { role, type: typeof role });
            return NextResponse.json({
                success: false,
                error: "Role is required and must be a string"
            }, { status: 400 });
        }

        // Define allowed roles
        const allowedRoles = ['registrar', 'forms'];
        const normalizedRole = role.toLowerCase().trim();
        if (!allowedRoles.includes(normalizedRole)) {
            console.warn("❌ Invalid role attempted:", { role, normalizedRole, allowedRoles });
            return NextResponse.json({
                success: false,
                error: `Invalid role. Allowed roles: ${allowedRoles.join(', ')}`
            }, { status: 400 });
        }

        // Get current user
        const user = await currentUser();
        if (!user) {
            console.warn("❌ No authenticated user found");
            return NextResponse.json({
                success: false,
                error: "No authenticated user found"
            }, { status: 401 });
        }

        console.log("🔍 Role validation successful:", {
            userId: user.id,
            originalRole: role,
            normalizedRole,
            isAllowed: allowedRoles.includes(normalizedRole)
        });

        // Initialize Clerk client and update user metadata
        try {
            const client = await clerkClient();
            const currentUserData = await client.users.getUser(user.id);
            const existingPrivateMetadata = currentUserData.privateMetadata || {};
            await client.users.updateUserMetadata(user.id, {
                privateMetadata: {
                    ...existingPrivateMetadata,
                    role: normalizedRole,
                    roleSetAt: new Date().toISOString(),
                    roleSetBy: 'self'
                }
            });
            const updatedUser = await client.users.getUser(user.id);
            const updatedSuccessfully = updatedUser.privateMetadata?.role === normalizedRole;
            console.log("✅ User role updated successfully:", {
                userId: user.id,
                role: normalizedRole,
                updateVerified: updatedSuccessfully
            });
            return NextResponse.json({
                success: true,
                data: {
                    userId: user.id,
                    role: normalizedRole,
                    roleSetAt: updatedUser.privateMetadata?.roleSetAt,
                    updateVerified: updatedSuccessfully,
                    privateMetadata: updatedUser.privateMetadata
                }
            });
        } catch (clerkError) {
            await logErrorWithRequestContext(clerkError, request, "Clerk client or update error");
            if (clerkError instanceof Error) {
                const errorMessage = clerkError.message;
                if (errorMessage.includes('User not found')) {
                    return NextResponse.json({
                        success: false,
                        error: "User not found in authentication system"
                    }, { status: 404 });
                }
                if (errorMessage.includes('Unauthorized') || errorMessage.includes('Permission')) {
                    return NextResponse.json({
                        success: false,
                        error: "Insufficient permissions to update user role"
                    }, { status: 403 });
                }
                if (errorMessage.includes('Rate limit')) {
                    return NextResponse.json({
                        success: false,
                        error: "Too many requests. Please try again later"
                    }, { status: 429 });
                }
            }
            return NextResponse.json({
                success: false,
                error: "An error occurred while updating user role. Please try again later."
            }, { status: 500 });
        }
    } catch (error) {
        await logErrorWithRequestContext(error, request, "Unexpected error in POST /api/nr/set-role");
        return NextResponse.json({
            success: false,
            error: "An unexpected error occurred. Please try again later."
        }, { status: 500 });
    }
}

// Helper to log error with stack and request context
async function logErrorWithRequestContext(error: unknown, request: Request, context: string) {
    let requestInfo: Record<string, unknown> = {};
    try {
        requestInfo = {
            method: request.method,
            url: request.url,
            headers: Object.fromEntries(request.headers.entries()),
            body: undefined
        };
        // Try to clone and parse the body if possible (only for debugging, not for response)
        if (request.method !== 'GET' && request.method !== 'HEAD') {
            const clone = request.clone();
            try {
                requestInfo.body = await clone.text();
            } catch { }
        }
    } catch { }
    console.error(`❌ [${context}]`, {
        error: error instanceof Error ? error.message : error,
        stack: error instanceof Error ? error.stack : undefined,
        request: requestInfo
    });
}