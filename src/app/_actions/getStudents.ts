"use server";

import { prisma } from "@/lib/prisma";

export async function getStudents() {
    try {
        console.log("Fetching students from database...");

        // Fetch students with their user information, regardless of status but only non-deleted
        const students = await prisma.student.findMany({
            where: {
                deletedAt: null, // Only non-deleted students
            },
            include: {
                user: {
                    select: {
                        firstName: true,
                        lastName: true,
                        email: true,
                    },
                },
            },
            orderBy: {
                createdAt: "desc", // Most recent first
            },
        });

        console.log("Students fetched successfully:", students.length); // Transform the data to match the expected format
        const formattedStudents = students.map((student) => ({
            id: student.studentNumber,
            firstName: student.user.firstName,
            lastName: student.user.lastName,
            gradeLevel: student.gradeLevel,
            strand:
                student.gradeLevel.includes("11") ||
                student.gradeLevel.includes("12")
                    ? "Senior High"
                    : "Junior High",
            status: student.status,
            email: student.user.email,
        }));

        return {
            success: true,
            students: formattedStudents,
        };
    } catch (error) {
        console.error("Error fetching students:", error);
        return {
            success: false,
            students: [],
            error: "Failed to fetch students",
        };
    }
}
