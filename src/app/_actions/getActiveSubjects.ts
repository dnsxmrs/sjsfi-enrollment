'use server'

import { prisma } from "@/lib/prisma";

export async function getActiveSubjects() {
    try {
        // Count active subjects
        console.log("Fetching count of active subjects...");
        const activeSubjectCount = await prisma.subject.count({
            where: {
                deletedAt: null,
            },
        });

        console.log("Count of active subjects fetched successfully:", activeSubjectCount);
        return {
            success: true,
            count: activeSubjectCount,
        };
    } catch (error) {
        console.error("Error fetching active subjects:", error);
        return {
            success: false,
            count: 0,
            error: "Failed to fetch active subjects",
        };
    }
}
