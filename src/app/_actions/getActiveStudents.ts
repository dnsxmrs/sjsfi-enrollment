'use server'

import { prisma } from "@/lib/prisma";

export async function getActiveStudents() {
    try {
        // Count active students
        console.log("Fetching count of active students...");
        const activeStudentCount = await prisma.student.count({
            where: {
                status: "active",
                deletedAt: null,
            },
        });

        console.log("Count of active students fetched successfully:", activeStudentCount);
        return {
            success: true,
            count: activeStudentCount,
        };
    } catch (error) {
        console.error("Error fetching active students:", error);
        return {
            success: false,
            count: 0,
            error: "Failed to fetch active students",
        };
    }
}
