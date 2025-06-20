import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST() {
    try {
        const { userId } = await auth();

        if (!userId) {
            return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
        }

        // You can add any additional server-side cleanup here
        // For example, clearing database sessions, logging, etc.

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Sign out API error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}