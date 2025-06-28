"use server";

import { prisma } from "@/lib/prisma";
import { logSystemAction } from "@/lib/systemLogger";

export async function getStudentsByGradeLevel() {
    let logStatus: 'SUCCESS' | 'FAILED' = 'SUCCESS';
    let logError: string | undefined = undefined;
    try {
        // Group registrations by yearLevelRef, only active and non-deleted
        const grouped = await prisma.registration.groupBy({
            by: ['yearLevelRef'],
            where: {
                deletedAt: null,
                status: 'APPROVED', // or 'PENDING' or another valid RegistrationStatus
            },
            _count: {
                id: true,
            },
        });

        // Fetch all year levels for name mapping
        const yearLevels = await prisma.yearLevel.findMany({
            where: { deletedAt: null },
        });
        const yearLevelMap = Object.fromEntries(yearLevels.map(yl => [yl.id, yl.name]));

        // Transform the data to match the pie chart format
        const chartData = grouped.map((group) => ({
            name: yearLevelMap[group.yearLevelRef] || `YearLevel ${group.yearLevelRef}`,
            value: group._count?.id ?? 0,
        }));

        await logSystemAction({
            actionCategory: 'SYSTEM',
            actionType: 'VIEW',
            actionDescription: 'Fetch students grouped by year level',
            targetType: 'Registration',
            targetId: 'all',
            status: 'SUCCESS',
            severityLevel: 'LOW',
        });

        return {
            success: true,
            data: chartData,
        };
    } catch (error) {
        logStatus = 'FAILED';
        logError = 'Failed to fetch students by grade level';
        await logSystemAction({
            actionCategory: 'SYSTEM',
            actionType: 'VIEW',
            actionDescription: 'Fetch students grouped by year level',
            targetType: 'Registration',
            targetId: 'all',
            status: 'FAILED',
            errorMessage: logError,
            severityLevel: 'LOW',
        });
        console.error("Error fetching students by grade level:", error);
        return {
            success: false,
            data: [],
            error: logError,
        };
    }
}
