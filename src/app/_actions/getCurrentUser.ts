import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function getCurrentUser() {
    try {
        // Get the current user from Clerk
        const clerkUser = await currentUser();

        if (
            !clerkUser ||
            !clerkUser.emailAddresses ||
            clerkUser.emailAddresses.length === 0
        ) {
            console.log("No Clerk user or email found");
            return {
                name: "Guest User",
                studentNo: "N/A",
                schoolYear: "N/A",
                email: "",
                role: "guest",
            };
        }

        const email = clerkUser.emailAddresses[0].emailAddress;
        console.log("Fetching user with email:", email);

        // Fetch user data from Prisma database using email
        const user = await prisma.user.findUnique({
            where: {
                email: email,
            },
            include: {
                student: {
                    include: {
                        enrollments: {
                            where: {
                                status: "enrolled",
                            },
                            orderBy: {
                                createdAt: "desc",
                            },
                            take: 1,
                        },
                    },
                },
                teacher: true,
            },
        });

        if (!user) {
            console.log("User not found in database for email:", email);
            // Return default values if user not found in database
            return {
                name:
                    clerkUser.firstName + " " + clerkUser.lastName ||
                    "Unknown User",
                studentNo: "Not registered",
                schoolYear: "N/A",
                email: email,
                role: "unregistered",
            };
        }
        console.log("User found:", user.firstName, user.role);
        console.log("User student data:", user.student);
        console.log("User teacher data:", user.teacher);
        console.log(
            'DEBUG - user.role === "student":',
            user.role === "student"
        );
        console.log(
            'DEBUG - user.role.toLowerCase() === "student":',
            user.role.toLowerCase() === "student"
        );
        console.log("DEBUG - !!user.student:", !!user.student);
        console.log(
            "DEBUG - user.student exists and has studentNumber:",
            user.student?.studentNumber
        );

        // Format the response based on user role (case-insensitive)
        if (user.role.toLowerCase() === "student") {
            console.log("✅ Entered student role condition");
            if (user.student) {
                console.log("✅ User has student data");
                console.log(
                    "Processing student user - studentNumber:",
                    user.student.studentNumber
                );
                const result = {
                    name: user.firstName,
                    studentNo: user.student.studentNumber,
                    schoolYear:
                        user.student.enrollments[0]?.schoolYear ||
                        "Not enrolled",
                    email: user.email,
                    role: user.role,
                    gradeLevel: user.student.gradeLevel,
                };
                console.log("Returning student result:", result);
                return result;
            } else {
                console.log(
                    "❌ User has student role but no student data found"
                );
                return {
                    name: user.firstName,
                    studentNo: "Student data not found",
                    schoolYear: "N/A",
                    email: user.email,
                    role: user.role,
                    gradeLevel: "N/A",
                };
            }
        } else if (user.role.toLowerCase() === "teacher" && user.teacher) {
            console.log(
                "✅ Processing teacher user - employeeNumber:",
                user.teacher.employeeNumber
            );
            return {
                name: user.firstName,
                employeeNo: user.teacher.employeeNumber,
                studentNo: "N/A", // Add studentNo for compatibility
                email: user.email,
                role: user.role,
                specialization: user.teacher.specialization,
            };
        } else {
            console.log("❌ Processing other user role:", user.role);
            console.log("Student data exists?", !!user.student);
            console.log("Teacher data exists?", !!user.teacher);
            // For admin or other roles
            return {
                name: user.firstName,
                studentNo: "N/A", // Add studentNo for compatibility
                email: user.email,
                role: user.role,
            };
        }
    } catch (error) {
        console.error("Error fetching current user:", error);
        // Return fallback values instead of null
        return {
            name: "Error Loading User",
            studentNo: "N/A",
            schoolYear: "N/A",
            email: "",
            role: "error",
        };
    }
}
