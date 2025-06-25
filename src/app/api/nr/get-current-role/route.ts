import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const user = await currentUser();

        if (!user) {
            return NextResponse.json(
                { error: "User not authenticated" },
                { status: 401 }
            );
        }

        const role = user.privateMetadata?.role as string;

        return NextResponse.json({
            success: true,
            role: role || null,
            userId: user.id
        });
    } catch (error) {
        console.error("Error getting current role:", error);
        return NextResponse.json(
            { error: "Failed to get current role" },
            { status: 500 }
        );
    }
}
