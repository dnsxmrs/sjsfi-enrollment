"use server";

import { prisma } from "@/lib/prisma";

export async function getStudentsByGradeLevel() {
    try {
        console.log("Fetching students by grade level from database...");

        // Get count of students grouped by grade level
        const studentsGrouped = await prisma.student.groupBy({
            by: ['gradeLevel'],
            where: {
                deletedAt: null, // Only non-deleted students
                status: 'active', // Only active students
            },
            _count: {
                id: true,
            },
            orderBy: {
                gradeLevel: 'asc',
            },
        });

        console.log("Students by grade level fetched successfully:", studentsGrouped.length);

        // Transform the data to match the pie chart format
        const chartData = studentsGrouped.map((group) => ({
            name: group.gradeLevel,
            value: group._count.id,
        }));

        return {
            success: true,
            data: chartData,
        };
    } catch (error) {
        console.error("Error fetching students by grade level:", error);
        return {
            success: false,
            data: [],
            error: "Failed to fetch students by grade level",
        };
    }
}
