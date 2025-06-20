import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { createClerkClient } from "@clerk/backend";

const clerkClient = createClerkClient({
    secretKey: process.env.CLERK_SECRET_KEY,
});

// Helper function to check if user role is allowed for a specific route
function checkRoleForRoute(pathname: string, userRole: string): boolean {
    const role = userRole.toLowerCase();

    if (pathname.startsWith("/forms/")) return role === "registrar";

    return false;
}

// Helper function to get the correct home page for a role
function getRoleHomePage(userRole: string): string {
    const role = userRole.toLowerCase();

    switch (role) {
        case "registrar":
            return "/forms/student-registration";
        default:
            return "/workaround/sign-out";
    }
}

const isPublicRoute = createRouteMatcher([
    "/",
    "/auth/(.*)",
    "/workaround/sign-out"
]);

// Define protected routes (require authentication)
const isProtectedRoute = createRouteMatcher([
    "/forms/(.*)"
]);

export default clerkMiddleware(
    async (auth, req) => {
        const { userId } = await auth();
        const isAuthenticated = !!userId;
        const url = new URL(req.url);

        // Case 1: Not authenticated and trying to access protected route
        if (!isAuthenticated && isProtectedRoute(req)) {
            console.log(
                "⚠️ M Unauthenticated user trying to access protected route:",
                url.pathname
            );
            await auth.protect();
            return;
        }

        // conditon if route is /api/, then execute this block
        else if (isAuthenticated && url.pathname.startsWith("/api/")) {
            console.log("✅ M Authenticated user accessing API route:", url.pathname);
            return NextResponse.next();
        }

        // Case 2: Authenticated user trying to access public routes (redirect to their dashboard)
        else if (isAuthenticated && isPublicRoute(req)) {
            // Allow access to terms and privacy pages even when authenticated
            if (url.pathname === "/workaround/sign-out") {
                console.log(
                    "✅ M Authenticated user accessing terms or privacy page or sign-out"
                );
                return NextResponse.next();
            }

            // Allow authenticated users to stay on auth pages during login process
            if (url.pathname.startsWith("/auth/")) {
                console.log(
                    "✅ M Allowing authenticated user to access auth page during login process"
                );
                return NextResponse.next();
            }

            console.log(
                "⚠️ M Authenticated user attempting to access public route"
            );

            try {
                // Get user with private metadata (where role is stored)
                const user = await clerkClient.users.getUser(userId);
                const userRole = user?.privateMetadata?.role as string;
                console.log("M User Role from privateMetadata:", userRole);
                let redirectUrl: string;
                // Determine redirect based on role
                if (userRole) {
                    switch (userRole) {
                        case "registrar":
                            redirectUrl = "/forms/student-registration"; // redirect to student registration form
                            break;
                        default:
                            redirectUrl = "/workaround/sign-out";
                    }
                } else {
                    // If no role is found but user is authenticated, allow them to stay
                    // This handles the case during login where role isn't set yet
                    console.warn(
                        "⚠️ M No role found for user, not allowing access to continue login process"
                    );
                    return NextResponse.redirect(new URL("/workaround/sign-out", req.url));
                }

                console.log("🔄 M Redirecting to:", redirectUrl);
                return NextResponse.redirect(new URL(redirectUrl, req.url));
            } catch (error) {
                console.error("Error checking user role:", error);
                // If we can't check the role, allow access to continue instead of forcing sign-out
                console.log(
                    "⚠️ M Error checking role, allowing request to continue..."
                );
                return NextResponse.redirect(new URL("/workaround/sign-out", req.url));
            }
        }

        // Case 3: Authenticated user trying to access protected routes (validate role permissions)
        else if (isAuthenticated && isProtectedRoute(req)) {
            console.log(
                "🔍 M Checking role for protected route access:",
                url.pathname
            );

            try {
                // Get user with private metadata (where role is stored)
                const user = await clerkClient.users.getUser(userId);
                const userRole = user?.privateMetadata?.role as string;

                console.log(
                    "M User Role from privateMetadata for protected route:",
                    userRole
                ); if (!userRole) {
                    // If no role is defined, redirect to sign-in
                    console.log(
                        "⚠️ M No role defined for user accessing protected route, redirecting to sign-in..."
                    );
                    return NextResponse.redirect(
                        new URL("/workaround/sign-out", req.url)
                    );
                }

                // Check if user has the correct role for the route they're trying to access
                const allowedForRoute = checkRoleForRoute(
                    url.pathname,
                    userRole
                );

                if (!allowedForRoute) {
                    console.log(
                        "❌ M User does not have permission for this route:",
                        url.pathname,
                        "Role:",
                        userRole
                    );
                    // Redirect to their appropriate home page
                    const correctRoute = getRoleHomePage(userRole);
                    return NextResponse.redirect(
                        new URL(correctRoute, req.url)
                    );
                }

                console.log(
                    "✅ M Allowing access to protected route:",
                    url.pathname,
                    "for role:",
                    userRole
                );
                return NextResponse.next();
            } catch (error) {
                console.error(
                    "Error checking user role for protected route:",
                    error
                );
                // If we can't check the role, redirect to home page instead of forcing sign-out
                console.log(
                    "⚠️ M Error checking role, redirecting to home page..."
                );
                return NextResponse.redirect(new URL("/workaround/sign-out", req.url));
            }
        }

        // Case 4: Default fallback for all other scenarios (not authenticated + public routes)
        // This includes unauthenticated users accessing public routes - allow them through
        console.log("✅ M Allowing request to continue:", url.pathname);
        return NextResponse.next();
    },
    { debug: false }
); // change before pushing to production

export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
        // Always run for API routes
        "/(api|trpc)(.*)",
    ],
};