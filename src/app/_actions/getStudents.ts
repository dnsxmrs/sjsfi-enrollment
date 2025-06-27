"use server";

import { prisma } from "@/lib/prisma";

export async function getStudents() {
    try {
        console.log("Fetching students from database...");

        // Fetch students with their user information, regardless of status but only non-deleted
        const registration = await prisma.registration.findMany({
            where: {
                status: 'PENDING', // Only active registrations
                deletedAt: null, // Only non-deleted students
            },
            include: {
                yearLevel: true, // Include year level information
                schoolYear: true, // Include school year information
                studentForm: true, // Include student application form data
                guardians: true, // Include guardians information
                contactNumbers: true, // Include contact numbers
                registrationcode: true, // Include registration codes
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
            birthdate: regis.birthdate,
            placeOfBirth: regis.placeOfBirth,
            age: regis.age,
            gender: regis.gender,
            streetAddress: regis.streetAddress,
            city: regis.city,
            stateProvince: regis.stateProvince,
            postalCode: regis.postalCode,
            modeOfPayment: regis.modeOfPayment,
            amountPayable: regis.amountPayable,
            registrationType: regis.registrationType,
            gradeLevel: regis.yearLevel.name,
            yearLevelId: regis.yearLevel.id,
            schoolYear: {
                id: regis.schoolYear.id,
                year: regis.schoolYear.year,
                startDate: regis.schoolYear.startDate,
                endDate: regis.schoolYear.endDate,
                status: regis.schoolYear.status,
            },
            status: regis.status,
            email: regis.emailAddress,
            guardians: regis.guardians.map(guardian => ({
                id: guardian.id,
                familyName: guardian.familyName,
                firstName: guardian.firstName,
                middleName: guardian.middleName,
                occupation: guardian.occupation,
                relationToStudent: guardian.relationToStudent,
            })),
            contactNumbers: regis.contactNumbers.map(contact => ({
                id: contact.id,
                number: contact.number,
            })),
            studentForm: regis.studentForm ? {
                id: regis.studentForm.id,
                // Add other student form fields as needed
            } : null,
            registrationCodes: regis.registrationcode.map(code => ({
                id: code.id,
                code: code.registrationCode,
                status: code.status,
                expirationDate: code.expirationDate,
                createdAt: code.createdAt,
            })),
            createdAt: regis.createdAt,
            updatedAt: regis.updatedAt,
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
