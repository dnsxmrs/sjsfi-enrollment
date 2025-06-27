"use server";

import { prisma } from "@/lib/prisma";

export async function getSchoolYears() {
    try {
        const schoolYears = await prisma.academicTerm.findMany({
            where: {
                status: 'ACTIVE', // Only active school years
                deletedAt: null, // Only non-deleted students
            },
        });

        return {
            success: true,
            schoolYears,
            message: 'School years fetched successfully'
        };
    } catch (error) {
        console.error('Error fetching school years:', error);

        return {
            success: false,
            schoolYears: [],
            error: error instanceof Error ? error.message : 'Failed to fetch school years'
        };
    }
}

export async function getSchoolAllYears() {
    try {
        const schoolYears = await prisma.academicTerm.findMany({
            where: {
                deletedAt: null, // Only non-deleted school years
            },
            orderBy: [
                { startDate: 'desc' }, // Latest school year first
                { createdAt: 'desc' }  // Secondary sort by creation date
            ]
        });

        return {
            success: true,
            schoolYears,
            message: 'School years fetched successfully'
        };
    } catch (error) {
        console.error('Error fetching school years:', error);

        return {
            success: false,
            schoolYears: [],
            error: error instanceof Error ? error.message : 'Failed to fetch school years'
        };
    }
}
