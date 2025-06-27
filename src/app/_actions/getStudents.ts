"use server";

import { prisma } from "@/lib/prisma";

export async function getStudents() {
    try {
        console.log("Fetching students from database...");

        // Fetch students with their user information, regardless of status but only non-deleted
        const registration = await prisma.registration.findMany({
            where: {
                deletedAt: null, // Only non-deleted students
            },
            include: {
                yearLevel: {
                    select: {
                        name: true, // Include only the name of the year level
                    },
                }
            },
            orderBy: {
                createdAt: "desc", // Most recent first
            },
        });

        // console.log("Students fetched successfully:", registration.length); // Transform the data to match the expected format
        const formattedStudents = registration.map((regis) => ({
            id: regis.studentNo,
            registrationId: regis.id,
            firstName: regis.firstName,
            middleName: regis.middleName,
            familyName: regis.familyName,
            gradeLevel: regis.yearLevel.name,

            status: regis.status,
            email: regis.emailAddress,
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
