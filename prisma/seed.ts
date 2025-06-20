import { prisma } from '@/lib/prisma'

async function main() {
    console.log('🌱 Starting database seeding...');

    // Clear existing data (in reverse order of dependencies)
    console.log('🧹 Cleaning existing data...');
    await prisma.payment.deleteMany();
    await prisma.reportCard.deleteMany();
    await prisma.attendance.deleteMany();
    await prisma.evaluation.deleteMany();
    await prisma.grade.deleteMany();
    await prisma.subject.deleteMany();
    await prisma.enrollment.deleteMany();
    await prisma.section.deleteMany();
    await prisma.student.deleteMany();
    await prisma.teacher.deleteMany();
    await prisma.parent.deleteMany();
    await prisma.user.deleteMany();

    // 1. Create Parent Users
    console.log('👨‍👩‍👧‍👦 Creating parents...');
    const parentUsers = await Promise.all([
        prisma.user.create({
            data: {
                email: 'maria.juarez@example.com',
                passwordHashed: 'hashedpassword123',
                name: 'Maria Juarez',
                role: 'parent',
                parent: {
                    create: {
                        contactNumber: '09171234567'
                    }
                }
            },
            include: { parent: true }
        }),
        prisma.user.create({
            data: {
                email: 'carlos.santos@example.com',
                passwordHashed: 'hashedpassword124',
                name: 'Carlos Santos',
                role: 'parent',
                parent: {
                    create: {
                        contactNumber: '09188765432'
                    }
                }
            },
            include: { parent: true }
        }),
        prisma.user.create({
            data: {
                email: 'ana.dela.cruz@example.com',
                passwordHashed: 'hashedpassword125',
                name: 'Ana Dela Cruz',
                role: 'parent',
                parent: {
                    create: {
                        contactNumber: '09199876543'
                    }
                }
            },
            include: { parent: true }
        })
    ]);

    // 2. Create Teacher Users
    console.log('👨‍🏫 Creating teachers...');
    const teacherUsers = await Promise.all([
        prisma.user.create({
            data: {
                email: 'prof.rivera@sjsfi.edu.ph',
                passwordHashed: 'hashedpassword200',
                name: 'Prof. Carmen Rivera',
                role: 'teacher',
                teacher: {
                    create: {
                        employeeNumber: 'EMP2025001',
                        specialization: 'Mathematics',
                        contactNumber: '09161234567',
                        assignedSections: 'Grade 10-A, Grade 10-B'
                    }
                }
            },
            include: { teacher: true }
        }),
        prisma.user.create({
            data: {
                email: 'prof.garcia@sjsfi.edu.ph',
                passwordHashed: 'hashedpassword201',
                name: 'Prof. Roberto Garcia',
                role: 'teacher',
                teacher: {
                    create: {
                        employeeNumber: 'EMP2025002',
                        specialization: 'Science',
                        contactNumber: '09162345678',
                        assignedSections: 'Grade 9-A, Grade 11-A'
                    }
                }
            },
            include: { teacher: true }
        }),
        prisma.user.create({
            data: {
                email: 'prof.mendoza@sjsfi.edu.ph',
                passwordHashed: 'hashedpassword202',
                name: 'Prof. Elena Mendoza',
                role: 'teacher',
                teacher: {
                    create: {
                        employeeNumber: 'EMP2025003',
                        specialization: 'English',
                        contactNumber: '09163456789',
                        assignedSections: 'Grade 9-A, Grade 10-A, Grade 11-A'
                    }
                }
            },
            include: { teacher: true }
        }),
        prisma.user.create({
            data: {
                email: 'prof.torres@sjsfi.edu.ph',
                passwordHashed: 'hashedpassword203',
                name: 'Prof. Michael Torres',
                role: 'teacher',
                teacher: {
                    create: {
                        employeeNumber: 'EMP2025004',
                        specialization: 'Filipino',
                        contactNumber: '09164567890',
                        assignedSections: 'Grade 9-A, Grade 10-A, Grade 11-A'
                    }
                }
            },
            include: { teacher: true }
        })
    ]);

    // 3. Create Sections
    console.log('🏫 Creating sections...');
    const sections = await Promise.all([
        prisma.section.create({
            data: {
                teacherId: teacherUsers[0].teacher!.id,
                name: 'Grade 9-A',
                gradeLevel: 'Grade 9'
            }
        }),
        prisma.section.create({
            data: {
                teacherId: teacherUsers[0].teacher!.id,
                name: 'Grade 10-A',
                gradeLevel: 'Grade 10'
            }
        }),
        prisma.section.create({
            data: {
                teacherId: teacherUsers[1].teacher!.id,
                name: 'Grade 11-A',
                gradeLevel: 'Grade 11'
            }
        })
    ]);

    // 4. Create Student Users
    console.log('👨‍🎓 Creating students...');
    const studentUsers = await Promise.all([
        prisma.user.create({
            data: {
                email: 'jose.reyes@student.sjsfi.edu.ph',
                passwordHashed: 'hashedpassword301',
                name: 'Jose Miguel Reyes',
                role: 'student',
                student: {
                    create: {
                        parentId: parentUsers[0].parent!.id,
                        studentNumber: 'STU2025001',
                        dateOfBirth: new Date('2007-03-15'),
                        gender: 'Male',
                        guardianName: 'Maria Juarez',
                        guardianContact: '09171234567',
                        address: '123 Mabini Street, Quezon City',
                        gradeLevel: 'Grade 10',
                        status: 'active'
                    }
                }
            },
            include: { student: true }
        }),
        prisma.user.create({
            data: {
                email: 'angelica.tan@student.sjsfi.edu.ph',
                passwordHashed: 'hashedpassword302',
                name: 'Angelica Tan',
                role: 'student',
                student: {
                    create: {
                        parentId: parentUsers[0].parent!.id,
                        studentNumber: 'STU2025002',
                        dateOfBirth: new Date('2008-06-21'),
                        gender: 'Female',
                        guardianName: 'Maria Juarez',
                        guardianContact: '09171234567',
                        address: '45 Mahogany Avenue, Pasig City',
                        gradeLevel: 'Grade 9',
                        status: 'active'
                    }
                }
            },
            include: { student: true }
        }),
        prisma.user.create({
            data: {
                email: 'daniel.santos@student.sjsfi.edu.ph',
                passwordHashed: 'hashedpassword303',
                name: 'Daniel Santos',
                role: 'student',
                student: {
                    create: {
                        parentId: parentUsers[1].parent!.id,
                        studentNumber: 'STU2025003',
                        dateOfBirth: new Date('2006-12-03'),
                        gender: 'Male',
                        guardianName: 'Carlos Santos',
                        guardianContact: '09188765432',
                        address: '89 Jacinto Road, Manila',
                        gradeLevel: 'Grade 11',
                        status: 'active'
                    }
                }
            },
            include: { student: true }
        }),
        prisma.user.create({
            data: {
                email: 'sophia.cruz@student.sjsfi.edu.ph',
                passwordHashed: 'hashedpassword304',
                name: 'Sophia Cruz',
                role: 'student',
                student: {
                    create: {
                        parentId: parentUsers[2].parent!.id,
                        studentNumber: 'STU2025004',
                        dateOfBirth: new Date('2008-09-12'),
                        gender: 'Female',
                        guardianName: 'Ana Dela Cruz',
                        guardianContact: '09199876543',
                        address: '56 Rizal Avenue, Makati City',
                        gradeLevel: 'Grade 9',
                        status: 'active'
                    }
                }
            },
            include: { student: true }
        }),
        prisma.user.create({
            data: {
                email: 'marco.perez@student.sjsfi.edu.ph',
                passwordHashed: 'hashedpassword305',
                name: 'Marco Perez',
                role: 'student',
                student: {
                    create: {
                        parentId: parentUsers[1].parent!.id,
                        studentNumber: 'STU2025005',
                        dateOfBirth: new Date('2007-11-08'),
                        gender: 'Male',
                        guardianName: 'Carlos Santos',
                        guardianContact: '09188765432',
                        address: '78 Luna Street, Taguig City',
                        gradeLevel: 'Grade 10',
                        status: 'active'
                    }
                }
            },
            include: { student: true }
        })
    ]);

    // 5. Create Enrollments
    console.log('📚 Creating enrollments...');
    const enrollments = await Promise.all([
        // Grade 9 students
        prisma.enrollment.create({
            data: {
                studentId: studentUsers[1].student!.id, // Angelica (Grade 9)
                sectionId: sections[0].id, // Grade 9-A
                schoolYear: '2024-2025',
                status: 'enrolled'
            }
        }),
        prisma.enrollment.create({
            data: {
                studentId: studentUsers[3].student!.id, // Sophia (Grade 9)
                sectionId: sections[0].id, // Grade 9-A
                schoolYear: '2024-2025',
                status: 'enrolled'
            }
        }),
        // Grade 10 students
        prisma.enrollment.create({
            data: {
                studentId: studentUsers[0].student!.id, // Jose (Grade 10)
                sectionId: sections[1].id, // Grade 10-A
                schoolYear: '2024-2025',
                status: 'enrolled'
            }
        }),
        prisma.enrollment.create({
            data: {
                studentId: studentUsers[4].student!.id, // Marco (Grade 10)
                sectionId: sections[1].id, // Grade 10-A
                schoolYear: '2024-2025',
                status: 'enrolled'
            }
        }),
        // Grade 11 students
        prisma.enrollment.create({
            data: {
                studentId: studentUsers[2].student!.id, // Daniel (Grade 11)
                sectionId: sections[2].id, // Grade 11-A
                schoolYear: '2024-2025',
                status: 'enrolled'
            }
        })
    ]);

    // 6. Create Subjects
    console.log('📖 Creating subjects...');
    const subjects = [];
    const subjectNames = [
        { name: 'Mathematics', teacher: 0, description: 'Basic and Advanced Mathematics' },
        { name: 'Science', teacher: 1, description: 'General Science and Biology' },
        { name: 'English', teacher: 2, description: 'English Language and Literature' },
        { name: 'Filipino', teacher: 3, description: 'Filipino Language and Literature' }
    ];

    for (const enrollment of enrollments) {
        for (const subject of subjectNames) {
            const createdSubject = await prisma.subject.create({
                data: {
                    enrollmentId: enrollment.id,
                    teacherId: teacherUsers[subject.teacher].teacher!.id,
                    name: subject.name,
                    description: subject.description,
                    gradeLevel: enrollment.schoolYear
                }
            });
            subjects.push(createdSubject);
        }
    }

    // 7. Create Grades
    console.log('📊 Creating grades...');
    const quarters = ['1st Quarter', '2nd Quarter', '3rd Quarter', '4th Quarter'];
    const grades = [];

    for (const subject of subjects) {
        const enrollment = enrollments.find(e => e.id === subject.enrollmentId);
        if (enrollment) {
            for (const quarter of quarters) {
                const grade = await prisma.grade.create({
                    data: {
                        subjectId: subject.id,
                        studentId: enrollment.studentId,
                        quarter: quarter,
                        grade: Math.floor(Math.random() * 30) + 70, // Random grade between 70-100
                        remarks: Math.random() > 0.7 ? 'Excellent work' : null
                    }
                });
                grades.push(grade);
            }
        }
    }

    // 8. Create Attendance Records
    console.log('📅 Creating attendance records...');
    const attendanceStatuses = ['Present', 'Absent', 'Late', 'Excused'];
    const startDate = new Date('2024-09-01');
    const endDate = new Date('2025-06-30');
    
    for (const studentUser of studentUsers) {
        // Create attendance for random days
        for (let i = 0; i < 50; i++) {
            const randomDate = new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()));
            await prisma.attendance.create({
                data: {
                    studentId: studentUser.student!.id,
                    date: randomDate,
                    status: attendanceStatuses[Math.floor(Math.random() * attendanceStatuses.length)],
                    remarks: Math.random() > 0.8 ? 'Medical appointment' : null
                }
            });
        }
    }

    // 9. Create Evaluations
    console.log('⭐ Creating evaluations...');
    for (const subject of subjects) {
        const enrollment = enrollments.find(e => e.id === subject.enrollmentId);
        if (enrollment) {
            await prisma.evaluation.create({
                data: {
                    studentId: enrollment.studentId,
                    subjectId: subject.id,
                    teacherId: subject.teacherId,
                    rating: Math.floor(Math.random() * 3) + 3, // Rating between 3-5
                    comments: Math.random() > 0.5 ? 'Good teaching methods' : null
                }
            });
        }
    }

    // 10. Create Report Cards
    console.log('📋 Creating report cards...');
    for (const studentUser of studentUsers) {
        const studentGrades = grades.filter(g => g.studentId === studentUser.student!.id);
        const averageGrade = studentGrades.reduce((sum, g) => sum + g.grade, 0) / studentGrades.length;
        
        await prisma.reportCard.create({
            data: {
                studentId: studentUser.student!.id,
                schoolYear: '2024-2025',
                averageGrade: Math.round(averageGrade * 100) / 100,
                rank: Math.floor(Math.random() * 50) + 1, // Random rank 1-50
                remarks: averageGrade >= 90 ? 'With Honors' : averageGrade >= 85 ? 'Good Performance' : 'Satisfactory'
            }
        });
    }

    // 11. Create Payments
    console.log('💳 Creating payments...');
    const paymentTypes = ['Tuition Fee', 'Miscellaneous Fee', 'Laboratory Fee', 'Library Fee'];
    const paymentMethods = ['Cash', 'Credit Card', 'Bank Transfer', 'GCash'];
    const paymentStatuses = ['Paid', 'Pending', 'Overdue'];

    for (const enrollment of enrollments) {
        for (let i = 0; i < 3; i++) {
            await prisma.payment.create({
                data: {
                    studentId: enrollment.studentId,
                    enrollmentId: enrollment.id,
                    amount: Math.floor(Math.random() * 5000) + 1000, // Random amount between 1000-6000
                    paymentType: paymentTypes[Math.floor(Math.random() * paymentTypes.length)],
                    paymentMethod: paymentMethods[Math.floor(Math.random() * paymentMethods.length)],
                    referenceNumber: `REF${Date.now()}${Math.floor(Math.random() * 1000)}`,
                    status: paymentStatuses[Math.floor(Math.random() * paymentStatuses.length)],
                    paymentDate: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000) // Random date within last year
                }
            });
        }
    }

    console.log('✅ Database seeding completed successfully!');
    console.log(`📊 Summary:
    - Parents: ${parentUsers.length}
    - Teachers: ${teacherUsers.length}
    - Students: ${studentUsers.length}
    - Sections: ${sections.length}
    - Enrollments: ${enrollments.length}
    - Subjects: ${subjects.length}
    - Grades: ${grades.length}
    - Attendance Records: ${studentUsers.length * 50}
    - Evaluations: ${subjects.length}
    - Report Cards: ${studentUsers.length}
    - Payments: ${enrollments.length * 3}
    `);
}

main()
    .then(() => {
        console.log('🎉 Seed complete');
        return prisma.$disconnect();
    })
    .catch((e) => {
        console.error('❌ Seed failed', e);
        return prisma.$disconnect().finally(() => process.exit(1));
    });