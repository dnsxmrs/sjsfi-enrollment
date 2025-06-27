"use server";

import { prisma } from "@/lib/prisma";

export async function getYearLevels() {
    try {
        const yearLevels = await prisma.yearLevel.findMany({
            where: {
                deletedAt: null, // Only non-deleted year levels
            },
            orderBy: {
                createdAt: 'desc' // Order by creation date to maintain insertion order
            }
        });

        return {
            success: true,
            yearLevels,
            message: 'Year levels fetched successfully'
        };
    } catch (error) {
        console.error('Error fetching year levels:', error);

        return {
            success: false,
            yearLevels: [],
            error: error instanceof Error ? error.message : 'Failed to fetch year levels'
        };
    }
}
