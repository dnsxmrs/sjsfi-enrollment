"use server";

import { logSystemAction } from "@/lib/systemLogger";

export async function getStudentsByGradeLevel() {
    try {
        // Note: Student model doesn't have gradeLevel field in current schema
        // Returning mock data for development purposes
        console.log("Returning mock student distribution by grade level (gradeLevel field not found in Student model)...");

        // Mock data representing realistic student distribution in a Philippine secondary school
        const mockStudentsByGradeLevel = [
            {
                name: "Grade 7",
                value: 245,
                percentage: "28.5%",
                color: "#8B5CF6"
            },
            {
                name: "Grade 8",
                value: 220,
                percentage: "25.6%",
                color: "#06B6D4"
            },
            {
                name: "Grade 9",
                value: 198,
                percentage: "23.0%",
                color: "#10B981"
            },
            {
                name: "Grade 10",
                value: 197,
                percentage: "22.9%",
                color: "#F59E0B"
            }
        ];

        // Add additional metadata for comprehensive reporting
        const totalStudents = mockStudentsByGradeLevel.reduce((sum, grade) => sum + grade.value, 0);

        const detailedData = mockStudentsByGradeLevel.map(grade => ({
            ...grade,
            percentage: ((grade.value / totalStudents) * 100).toFixed(1) + "%",
            details: {
                male: Math.floor(grade.value * 0.52), // Realistic gender distribution
                female: Math.ceil(grade.value * 0.48),
                transferees: Math.floor(grade.value * 0.08), // 8% transferees
                newStudents: Math.floor(grade.value * 0.15), // 15% new students
                returningStudents: Math.floor(grade.value * 0.77) // 77% returning students
            }
        }));

        // Log the system action for fetching students by grade level (mock)
        await logSystemAction({
            actionCategory: "SYSTEM",
            actionType: "VIEW",
            actionDescription: `Fetched mock student distribution by grade level. Total students: ${totalStudents}`,
            targetType: "REPORT",
            targetId: "mock-students-by-grade-level",
            status: "SUCCESS",
            severityLevel: "LOW",
            metadata: { totalStudents, gradeLevels: detailedData.length }
        });

        console.log("Mock student distribution data returned successfully:", detailedData.length, "grade levels");
        console.log("Total students:", totalStudents);

        return {
            success: true,
            data: detailedData,
            summary: {
                totalStudents,
                totalGradeLevels: detailedData.length,
                averageStudentsPerGrade: Math.round(totalStudents / detailedData.length),
                mostPopulousGrade: detailedData.reduce((max, grade) => grade.value > max.value ? grade : max),
                leastPopulousGrade: detailedData.reduce((min, grade) => grade.value < min.value ? grade : min),
            },
            isMockData: true,
            message: "Returning mock data - gradeLevel field not implemented in Student model schema",
        };
    } catch (error) {
        // Log the error in system logger
        await logSystemAction({
            actionCategory: "SYSTEM",
            actionType: "VIEW",
            actionDescription: `Error fetching students by grade level: ${error}`,
            targetType: "REPORT",
            targetId: "mock-students-by-grade-level",
            status: "FAILED",
            severityLevel: "LOW",
            errorMessage: String(error)
        });
        console.error("Error in getStudentsByGradeLevel:", error);
        return {
            success: false,
            data: [],
            error: "Failed to fetch students by grade level",
        };
    }
}
