// src/app/_actions/setUserRole.ts
'use server'

import { clerkClient, currentUser } from '@clerk/nextjs/server'

export type SetResult = {
    success: boolean;
    error?: string;
    redirectUrl?: string;
};

export async function setUserRole(role: string, origin: string): Promise<SetResult> {
    try {
        const allowedRoles = ['student', 'registrar'];
        const normalizedRole = role.toLowerCase();

        // Check if required environment variables are present
        if (!process.env.CLERK_SECRET_KEY) {
            console.error('❌ Missing CLERK_SECRET_KEY environment variable');
            return { success: false, error: 'Server configuration error: Missing authentication keys' };
        }

        if (!role || !origin) {
            console.warn('❌ Validation error: Missing role or origin', { role, origin });
            return { success: false, error: 'Missing role or origin' };
        }

        if (!role || typeof role !== 'string') {
            console.warn('❌ Invalid role provided:', { role, type: typeof role });
            return { success: false, error: 'Invalid role provided' };
        }

        if (!allowedRoles.includes(normalizedRole)) {
            console.warn('❌ Invalid role attempted:', { role, normalizedRole, allowedRoles });
            return { success: false, error: 'Invalid role: Role not allowed' };
        }

        if (!allowedRoles.includes(origin)) {
            console.warn(`❌ Invalid origin attempt: ${origin}`);
            return { success: false, error: 'Invalid origin attempt.' };
        }

        // const { userId } = await auth();
        const user = await currentUser(); // from Clerk's frontend SDK
        const userId = user?.id;

        if (!userId) {
            console.warn('❌ Unauthorized: No user ID found');
            return { success: false, error: 'Unauthorized: User not authenticated' };
        }

        console.log('🔍 Role validation:', {
            originalRole: role,
            normalizedRole,
            allowedRoles,
            isAllowed: allowedRoles.includes(normalizedRole)
        });

        try {
            const client = await clerkClient();

            // Update Clerk private metadata with role
            await client.users.updateUserMetadata(userId, {
                privateMetadata: {
                    role: normalizedRole,
                    roleSetAt: new Date().toISOString(),
                    // roleSetBy: adminUserId, // if applicable
                },
            });

            console.log('✅ User role updated successfully:', { userId, role: normalizedRole });
            return { success: true };
        } catch (clerkError) {
            console.error('💥 Clerk client or update error:', clerkError);
            console.error('💥 Clerk error details:', {
                name: clerkError instanceof Error ? clerkError.name : 'Unknown',
                message: clerkError instanceof Error ? clerkError.message : String(clerkError),
                stack: clerkError instanceof Error ? clerkError.stack : 'No stack trace'
            });
            const errorResult = {
                success: false,
                error: clerkError instanceof Error ? clerkError.message : 'Clerk operation failed'
            };
            console.log('🔍 Returning clerk error result:', errorResult);
            return errorResult;
        }

    } catch (error) {
        // Log the error for debugging
        console.error('💥 Outer catch - Error in setUserRole:', error);
        console.error('💥 Error details:', {
            name: error instanceof Error ? error.name : 'Unknown',
            message: error instanceof Error ? error.message : String(error),
            stack: error instanceof Error ? error.stack : 'No stack trace'
        });

        // Handle specific Clerk errors
        if (error && typeof error === 'object' && 'message' in error) {
            const errorMessage = (error as Error).message;
            console.log('🔍 Checking error message patterns:', errorMessage);

            // Check for common Clerk error patterns
            if (errorMessage.includes('User not found')) {
                console.warn('❌ User not found error detected');
                const result = { success: false, error: 'User not found in authentication system' };
                console.log('🔍 Returning user not found result:', result);
                return result;
            } else if (errorMessage.includes('Unauthorized') || errorMessage.includes('Permission')) {
                console.warn('❌ Authorization error detected');
                const result = { success: false, error: 'Insufficient permissions to update user role' };
                console.log('🔍 Returning authorization error result:', result);
                return result;
            } else if (errorMessage.includes('Rate limit')) {
                console.warn('❌ Rate limit error detected');
                const result = { success: false, error: 'Too many requests. Please try again later' };
                console.log('🔍 Returning rate limit error result:', result);
                return result;
            }

            console.warn('❌ Generic error with message:', errorMessage);
            const result = { success: false, error: `Failed to update user role: ${errorMessage}` };
            console.log('🔍 Returning generic error result:', result);
            return result;
        }

        // Generic error fallback
        console.warn('❌ Generic error fallback triggered');
        const fallbackResult = { success: false, error: 'An unexpected error occurred while updating user role' };
        console.log('🔍 Returning fallback error result:', fallbackResult);
        return fallbackResult;
    }
}

// Add this as a safety check to ensure the function always returns a proper result
export async function validateSetResult(result: unknown): Promise<SetResult> {
    if (!result || typeof result !== 'object') {
        console.error('❌ Invalid setUserRole result:', result);
        return { success: false, error: 'Invalid server response' };
    }

    const resultObj = result as Record<string, unknown>;
    if (typeof resultObj.success !== 'boolean') {
        console.error('❌ setUserRole result missing success property:', result);
        return { success: false, error: 'Invalid server response format' };
    }

    return result as SetResult;
}
