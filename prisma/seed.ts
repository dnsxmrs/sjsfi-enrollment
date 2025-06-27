import { prisma } from '@/lib/prisma'

// Helper functions for generating random data
function getRandomElement<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)];
}

function generateRandomDate(start: Date, end: Date): Date {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function generateRandomPhone(): string {
    return `09${Math.floor(Math.random() * 900000000) + 100000000}`;
}

function generateRandomEmail(firstName: string, lastName: string): string {
    const domains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'example.com'];
    return `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${getRandomElement(domains)}`;
}

async function main() {
    console.log('🌱 Starting database seeding...');

    // Clear existing data (in reverse order of dependencies)
    console.log('🧹 Cleaning existing data...');
    await prisma.registrationCode.deleteMany();
    await prisma.familyBackground.deleteMany();
    await prisma.healthHistory.deleteMany();
    await prisma.contactNumber.deleteMany();
    await prisma.guardian.deleteMany();
    await prisma.requirements.deleteMany();
    await prisma.studentApplication.deleteMany();
    await prisma.registration.deleteMany();
    await prisma.generalPolicy.deleteMany();
    await prisma.academicTerm.deleteMany();
    await prisma.yearLevel.deleteMany();
    await prisma.feedback.deleteMany();
    await prisma.student.deleteMany();
    await prisma.user.deleteMany();

    // 1. Create Year Levels (at least 3)
    console.log('📚 Creating year levels...');
    const yearLevels = await Promise.all([
        prisma.yearLevel.create({ data: { name: 'Kinder 1' } }),
        prisma.yearLevel.create({ data: { name: 'Kinder 2' } }),
        prisma.yearLevel.create({ data: { name: 'Grade 1' } }),
        prisma.yearLevel.create({ data: { name: 'Grade 2' } }),
        prisma.yearLevel.create({ data: { name: 'Grade 3' } }),
        prisma.yearLevel.create({ data: { name: 'Grade 4' } }),
        prisma.yearLevel.create({ data: { name: 'Grade 5' } }),
        prisma.yearLevel.create({ data: { name: 'Grade 6' } }),
        prisma.yearLevel.create({ data: { name: 'Grade 7' } }),
        prisma.yearLevel.create({ data: { name: 'Grade 8' } }),
        prisma.yearLevel.create({ data: { name: 'Grade 9' } }),
        prisma.yearLevel.create({ data: { name: 'Grade 10' } }),

    ]);

    // 2. Create Academic Terms (at least 3)
    console.log('🗓️ Creating academic terms...');
    const academicTerms = await Promise.all([
        prisma.academicTerm.create({
            data: {
                year: '2023-2024',
                startDate: new Date('2023-08-15'),
                endDate: new Date('2024-06-15'),
                status: 'INACTIVE'
            }
        }),
        prisma.academicTerm.create({
            data: {
                year: '2024-2025',
                startDate: new Date('2024-08-15'),
                endDate: new Date('2025-06-15'),
                status: 'ACTIVE'
            }
        }),
        prisma.academicTerm.create({
            data: {
                year: '2025-2026',
                startDate: new Date('2025-08-15'),
                endDate: new Date('2026-06-15'),
                status: 'INACTIVE'
            }
        }),
    ]);

    // 3. Create General Policies (at least 3)
    console.log('📋 Creating general policies...');
    await Promise.all([
        prisma.generalPolicy.create({
            data: {
                title: 'General Policy and Guidelines',
                content: '<h3>Registration Requirements</h3><p>Students must submit all required documents for enrollment.</p>'
            }
        })
    ]);

    // 4. Create Users (Students and Admin) - at least 3 students
    console.log('👥 Creating users...');
    const users = [];

    // Filipino first names and family names for realistic data
    const firstNames = [
        'Maria', 'Jose', 'Juan', 'Ana', 'Antonio', 'Carmen', 'Francisco', 'Rosa', 'Pedro', 'Teresa',
        'Manuel', 'Luz', 'Ricardo', 'Elena', 'Carlos', 'Cristina', 'Roberto', 'Patricia', 'Fernando', 'Isabel',
        'Erice', 'Angelica', 'Sophia', 'Marco', 'Daniel', 'Isabella', 'Gabriel', 'Samantha'
    ];

    const familyNames = [
        'Garcia', 'Cruz', 'Gonzalez', 'Reyes', 'Santos', 'Flores', 'Mendoza', 'Rivera', 'Torres', 'Rodriguez',
        'Ramos', 'Villanueva', 'Bautista', 'Francisco', 'Morales', 'Dela Cruz', 'Hernandez', 'Castro',
        'Marial', 'Tan', 'Lim', 'Sy', 'Wong', 'Go'
    ];

    // Create the specific student you requested first
    const specificStudent = await prisma.user.create({
        data: {
            email: 'student@student.com',
            firstName: 'John',
            middleName: 'Doe',
            familyName: 'Smith',
            role: 'STUDENT',
            student: {
                create: {
                    studentNumber: 'STU2025001'
                }
            }
        },
        include: { student: true }
    });
    users.push(specificStudent);

    // Create 5 more student users with variations
    for (let i = 0; i < 5; i++) {
        const firstName = getRandomElement(firstNames);
        const middleName = getRandomElement(firstNames);
        const familyName = getRandomElement(familyNames);

        const user = await prisma.user.create({
            data: {
                email: generateRandomEmail(firstName, familyName),
                firstName,
                middleName: Math.random() > 0.3 ? middleName : undefined,
                familyName,
                role: 'STUDENT',
                student: {
                    create: {
                        studentNumber: `2025-${String(i + 2).padStart(4, '0')}`
                    }
                }
            },
            include: { student: true }
        });
        users.push(user);
    }

    // Create admin users (at least 3)
    const adminUsers = await Promise.all([
        prisma.user.create({
            data: {
                email: 'admin@sjsfi.edu.ph',
                firstName: 'Administrator',
                familyName: 'System',
                role: 'ADMIN'
            }
        }),
        prisma.user.create({
            data: {
                email: 'staff@sjsfi.edu.ph',
                firstName: 'Staff',
                familyName: 'Office',
                role: 'STAFF'
            }
        }),
        prisma.user.create({
            data: {
                email: 'teacher@sjsfi.edu.ph',
                firstName: 'Teacher',
                familyName: 'Member',
                role: 'TEACHER'
            }
        })
    ]);

    // 5. Create Student Applications (at least 3)
    console.log('📝 Creating student applications...');
    const studentApplications = [];

    for (let i = 0; i < 4; i++) {
        const user = users[i];
        const academicTerm = getRandomElement(academicTerms);

        const application = await prisma.studentApplication.create({
            data: {
                academicYear: academicTerm.year,
                admissionToGrade: getRandomElement(['Grade 9', 'Grade 10', 'Grade 8', 'Grade 7']),
                familyName: user.familyName,
                firstName: user.firstName,
                middleName: user.middleName || '',
                nickName: Math.random() > 0.5 ? user.firstName.substring(0, 3) + 'y' : undefined,
                birthdate: new Date('2000-11-11'), // Use fixed date since Student model doesn't have dateOfBirth
                placeOfBirth: getRandomElement(['Manila', 'Quezon City', 'Makati', 'Pasig']),
                age: new Date().getFullYear() - new Date('2000-11-11').getFullYear(),
                birthOrder: Math.floor(Math.random() * 3) + 1,
                numberOfSiblings: Math.floor(Math.random() * 4),
                gender: getRandomElement(['MALE', 'FEMALE']), // Use Gender enum
                languagesSpokenAtHome: getRandomElement(['Filipino', 'English', 'Filipino and English']),
                childStatus: getRandomElement(['LEGITIMATE', 'ILLEGITIMATE', 'ADOPTED']),
                landLine: Math.random() > 0.7 ? `02${Math.floor(Math.random() * 90000000) + 10000000}` : undefined,
                mobileNumber: generateRandomPhone(),
                emailAddress: user.email,
                homeAddress: `${Math.floor(Math.random() * 999) + 1} Sample Street, Manila`,
                city: getRandomElement(['Manila', 'Quezon City', 'Makati']),
                stateProvince: 'Metro Manila',
                postalCode: String(Math.floor(Math.random() * 9000) + 1000),
                specialSkills: getRandomElement(['Drawing', 'Singing', 'Dancing', 'Sports']),
                hobbiesInterests: getRandomElement(['Reading', 'Sports', 'Music', 'Art']),
                createdBy: adminUsers[0].id,
                status: getRandomElement(['PENDING', 'APPROVED', 'REJECTED'])
            }
        });
        studentApplications.push(application);
    }

    // 6. Create Registrations (at least 3)
    console.log('🎓 Creating registrations...');
    const registrations = [];

    for (let i = 0; i < 4; i++) {
        const user = users[i];
        const yearLevel = getRandomElement(yearLevels);
        const academicTerm = getRandomElement(academicTerms);
        const application = Math.random() > 0.5 ? getRandomElement(studentApplications) : undefined;

        const registration = await prisma.registration.create({
            data: {
                studentApplicationId: application?.id,
                schoolYearRef: academicTerm.id,
                registrationType: getRandomElement(['NEW', 'OLD', 'TRANSFER']),
                yearLevelRef: yearLevel.id,
                studentNo: user.student!.studentNumber,
                familyName: user.familyName,
                firstName: user.firstName,
                middleName: user.middleName || '',
                birthdate: new Date('2000-11-11'), // Use fixed date
                placeOfBirth: getRandomElement(['Manila', 'Quezon City', 'Makati']),
                age: new Date().getFullYear() - new Date('2000-11-11').getFullYear(),
                gender: getRandomElement(['MALE', 'FEMALE']),
                streetAddress: `${Math.floor(Math.random() * 999) + 1} Sample Street`,
                city: getRandomElement(['Manila', 'Quezon City', 'Makati']),
                stateProvince: 'Metro Manila',
                postalCode: String(Math.floor(Math.random() * 9000) + 1000),
                modeOfPayment: getRandomElement(['Cash', 'Installment', 'Full Payment']),
                amountPayable: Math.floor(Math.random() * 30000) + 15000,
                emailAddress: user.email,
                status: getRandomElement(['PENDING', 'APPROVED', 'REJECTED'])
            }
        });
        registrations.push(registration);
    }

    // 7. Create Guardians for Registrations (at least 3 per registration)
    console.log('👨‍👩‍👧‍👦 Creating guardians...');
    for (const registration of registrations) {
        for (let i = 0; i < 2; i++) { // 2 guardians per registration
            await prisma.guardian.create({
                data: {
                    registrationId: registration.id,
                    familyName: getRandomElement(familyNames),
                    firstName: getRandomElement(firstNames),
                    middleName: getRandomElement(firstNames),
                    occupation: getRandomElement(['Teacher', 'Engineer', 'Doctor', 'Nurse', 'Businessman']),
                    relationToStudent: i === 0 ? getRandomElement(['Mother', 'Father']) : getRandomElement(['Aunt', 'Uncle', 'Grandmother'])
                }
            });
        }
    }

    // 8. Create Contact Numbers for Registrations (at least 3 per registration)
    console.log('📞 Creating contact numbers...');
    for (const registration of registrations) {
        for (let i = 0; i < 2; i++) { // 2 contact numbers per registration
            await prisma.contactNumber.create({
                data: {
                    registrationId: registration.id,
                    number: generateRandomPhone()
                }
            });
        }
    }

    // 9. Create Requirements (at least 3)
    console.log('📄 Creating requirements...');
    const requirementTypes = [
        'Birth Certificate',
        'Form 137',
        'Form 138',
        'Good Moral Certificate',
        'Medical Certificate',
        'ID Picture'
    ];

    for (let i = 0; i < 8; i++) {
        await prisma.requirements.create({
            data: {
                requirementType: getRandomElement(requirementTypes),
                status: getRandomElement(['PENDING', 'SUBMITTED', 'APPROVED', 'REJECTED']),
                fileUrl: Math.random() > 0.5 ? `https://example.com/files/doc_${i}.pdf` : undefined,
            }
        });
    }

    // 10. Create Health History for applications (at least 3)
    console.log('🏥 Creating health history...');
    for (let i = 0; i < Math.min(3, studentApplications.length); i++) {
        const application = studentApplications[i];
        await prisma.healthHistory.create({
            data: {
                studentFormId: application.id,
                childhoodDiseases: getRandomElement(['Measles', 'Chickenpox', 'None']),
                allergies: getRandomElement(['Food allergies', 'Drug allergies', 'None']),
                otherMedicalConditions: getRandomElement(['Asthma', 'None']),
                immunizations: 'Complete immunizations',
                specificHandicaps: 'None',
                createdBy: adminUsers[0].id
            }
        });
    }

    // 11. Create Family Background for applications (at least 3)
    console.log('👪 Creating family background...');
    for (let i = 0; i < Math.min(3, studentApplications.length); i++) {
        const application = studentApplications[i];
        const guardianTypes = ['FATHER', 'MOTHER']; // Use proper enum values

        for (const guardianType of guardianTypes) {
            await prisma.familyBackground.create({
                data: {
                    studentFormId: application.id,
                    guardianType: guardianType as 'FATHER' | 'MOTHER',
                    familyName: getRandomElement(familyNames),
                    firstName: getRandomElement(firstNames),
                    middleName: getRandomElement(firstNames),
                    birthdate: generateRandomDate(new Date('1970-01-01'), new Date('1990-12-31')),
                    placeOfBirth: getRandomElement(['Manila', 'Quezon City']),
                    age: Math.floor(Math.random() * 20) + 35,
                    nationality: 'Filipino',
                    religion: getRandomElement(['Catholic', 'Protestant', 'Other']),
                    landLine: Math.random() > 0.7 ? `02${Math.floor(Math.random() * 90000000) + 10000000}` : undefined,
                    mobileNo: generateRandomPhone(),
                    emailAddress: generateRandomEmail(getRandomElement(firstNames), getRandomElement(familyNames)),
                    homeAddress: `${Math.floor(Math.random() * 999) + 1} Sample Street`,
                    city: getRandomElement(['Manila', 'Quezon City']),
                    stateProvince: 'Metro Manila',
                    postalCode: String(Math.floor(Math.random() * 9000) + 1000),
                    educationalAttainment: getRandomElement(['High School', 'College Graduate']),
                    occupation: getRandomElement(['Teacher', 'Engineer', 'Businessman']),
                    employer: getRandomElement(['Government', 'Private Company']),
                    companyAddress: 'Business District, Manila',
                    companyCity: 'Manila',
                    businessNo: generateRandomPhone(),
                    annualIncome: Math.floor(Math.random() * 500000) + 200000,
                    parentStatus: getRandomElement(['MARRIED', 'SEPARATED', 'SINGLE']),
                    createdBy: adminUsers[0].id
                }
            });
        }
    }

    // 12. Create Registration Codes (at least 3)
    console.log('🔢 Creating registration codes...');
    for (let i = 0; i < 6; i++) {
        const registration = Math.random() > 0.5 ? getRandomElement(registrations) : undefined;
        const application = Math.random() > 0.5 ? getRandomElement(studentApplications) : undefined;

        await prisma.registrationCode.create({
            data: {
                registrationCode: `REG${Date.now()}${Math.floor(Math.random() * 1000)}`.substring(0, 20),
                status: getRandomElement(['ACTIVE', 'INACTIVE', 'EXPIRED']),
                expirationDate: Math.random() > 0.3 ? generateRandomDate(new Date(), new Date('2025-12-31')) : undefined,
                registrationId: registration?.id,
                applicationId: application?.id
            }
        });
    }

    // 13. Create Feedback (at least 3)
    console.log('💬 Creating feedback...');
    for (let i = 0; i < 5; i++) {
        await prisma.feedback.create({
            data: {
                type: getRandomElement(['SUGGESTION', 'COMPLAINT', 'COMPLIMENT']),
                message: getRandomElement([
                    'The registration process was smooth and easy to follow.',
                    'I had trouble uploading my documents. Please help.',
                    'When will I receive confirmation of my registration?',
                    'The website is very user-friendly. Thank you!',
                    'I need assistance with the payment process.'
                ]),
                suggestion: Math.random() > 0.5 ? getRandomElement([
                    'Please add more payment options.',
                    'The website could use better mobile support.',
                    'Add email notifications for status updates.'
                ]) : undefined
            }
        });
    }

    console.log('✅ Database seeding completed successfully!');
    console.log(`📊 Summary:
    - Year Levels: ${yearLevels.length}
    - Academic Terms: ${academicTerms.length}
    - Users: ${users.length + adminUsers.length}
    - Student Applications: ${studentApplications.length}
    - Registrations: ${registrations.length}
    - Guardians: ${registrations.length * 2}
    - Contact Numbers: ${registrations.length * 2}
    - Requirements: 8
    - Health History: ${Math.min(3, studentApplications.length)}
    - Family Background: ${Math.min(3, studentApplications.length) * 2}
    - Registration Codes: 6
    - Feedback: 5
    - General Policies: 3
    
    📝 Special Student Created:
    - Email: student@student.com
    - Birthday: November 11, 2000
    - Name: John Doe Smith
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