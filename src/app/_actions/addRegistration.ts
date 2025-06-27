'use server'

import { prisma } from '@/lib/prisma'

// Define enums locally since they might not be exported
enum RegistrationType {
    NEW = 'NEW',
    OLD = 'OLD',
    TRANSFER = 'TRANSFER'
}

enum Gender {
    MALE = 'MALE',
    FEMALE = 'FEMALE'
}

export interface RegistrationFormData {
    registrationCode: string
    schoolYear: string
    schoolYearType: 'old' | 'new'
    gradeYearLevel: string
    familyName: string
    firstName: string
    middleName: string
    birthDate: string
    placeOfBirth: string
    age: string
    gender: 'female' | 'male'
    streetAddress: string
    city: string
    stateProvince: string
    zipCode: string
    parents: Array<{
        familyName: string
        firstName: string
        middleName: string
        occupation: string
        relation: string
    }>
    contactNumbers: string[]
    modeOfPayment: string
    amountPayable: string
    emailAddress: string
    requirements?: {
        goodMoral: boolean
        birthCertificate: boolean
        f138: boolean
        f137: boolean
        privacyForm: boolean
    }
}

export interface RegistrationResult {
    success: boolean
    registration?: {
        id: number
        studentNo: string
        fullName: string
        yearLevel: string
        schoolYear: string
    }
    error?: string
}

export async function addRegistration(data: RegistrationFormData): Promise<RegistrationResult> {
    try {
        // 1. Validate the registration code and check if it's still active
        const registrationCodeRecord = await prisma.registrationCode.findUnique({
            where: {
                registrationCode: data.registrationCode
            }
        })

        if (!registrationCodeRecord) {
            return {
                success: false,
                error: 'Invalid registration code.'
            }
        }

        if (registrationCodeRecord.status !== 'active') {
            return {
                success: false,
                error: 'Registration code has already been used or is no longer valid.'
            }
        }

        // Check if the code has expired (if expiration date is set)
        if (registrationCodeRecord.expirationDate && new Date() > registrationCodeRecord.expirationDate) {
            return {
                success: false,
                error: 'Registration code has expired.'
            }
        }

        // 2. Find the school year and year level by name/year
        const schoolYearRecord = await prisma.schoolYear.findFirst({
            where: {
                year: data.schoolYear,
                status: 'active'
            }
        })

        if (!schoolYearRecord) {
            return {
                success: false,
                error: 'Invalid school year selected.'
            }
        }

        const yearLevelRecord = await prisma.yearLevel.findFirst({
            where: {
                name: data.gradeYearLevel
            }
        })

        if (!yearLevelRecord) {
            return {
                success: false,
                error: 'Invalid year level selected.'
            }
        }

        // 3. Generate student number (you may want to implement your own logic here)
        const registrationCount = await prisma.registration.count()
        const schoolYearPrefix = schoolYearRecord.startDate.getFullYear()
        const studentNo = `${data.registrationCode}-${schoolYearPrefix}-${String(registrationCount + 1).padStart(4, '0')}`

        // 4. Convert string values to appropriate types
        const ageNumber = parseInt(data.age, 10)
        const amountPayableNumber = parseInt(data.amountPayable, 10)
        const birthDateObj = new Date(data.birthDate)

        // Convert to UTC+8 (Philippine local time)
        const now = new Date();
        const phTime = new Date(now.getTime() + 8 * 60 * 60 * 1000);

        // Map registration type
        const registrationType: RegistrationType = data.schoolYearType === 'new' ? RegistrationType.NEW : RegistrationType.OLD

        // Map gender
        const genderEnum: Gender = data.gender === 'male' ? Gender.MALE : Gender.FEMALE

        // 5. Use a transaction to ensure data consistency
        const result = await prisma.$transaction(async (tx) => {
            // Create the registration record
            const registration = await tx.registration.create({
                data: {
                    schoolYearRef: schoolYearRecord.id,
                    registrationType: registrationType,
                    yearLevelRef: yearLevelRecord.id,
                    studentNo: studentNo,
                    familyName: data.familyName,
                    firstName: data.firstName,
                    middleName: data.middleName,
                    birthdate: birthDateObj,
                    placeOfBirth: data.placeOfBirth,
                    age: ageNumber,
                    gender: genderEnum,
                    streetAddress: data.streetAddress,
                    city: data.city,
                    stateProvince: data.stateProvince,
                    postalCode: data.zipCode,
                    modeOfPayment: data.modeOfPayment,
                    amountPayable: amountPayableNumber,
                    status: 'pending', // Default status
                    emailAddress: data.emailAddress,

                    createdAt: phTime,
                    updatedAt: phTime,
                }
            })

            // Create contact numbers
            for (const contactNumber of data.contactNumbers) {
                if (contactNumber.trim()) {
                    await tx.contactNumber.create({
                        data: {
                            registrationId: registration.id,
                            number: contactNumber.trim(),
                            createdAt: phTime,
                            updatedAt: phTime
                        }
                    })
                }
            }

            // Create guardians/parents
            for (const parent of data.parents) {
                if (parent.familyName.trim() || parent.firstName.trim()) {
                    await tx.guardian.create({
                        data: {
                            registrationId: registration.id,
                            familyName: parent.familyName,
                            firstName: parent.firstName,
                            middleName: parent.middleName,
                            occupation: parent.occupation,
                            relationToStudent: parent.relation,
                            createdAt: phTime,
                            updatedAt: phTime
                        }
                    })
                }
            }

            // Mark the registration code as used
            await tx.registrationCode.update({
                where: {
                    id: registrationCodeRecord.id
                },
                data: {
                    status: 'used',
                    updatedAt: phTime
                }
            })

            return registration
        })

        return {
            success: true,
            registration: {
                id: result.id,
                studentNo: result.studentNo,
                fullName: `${result.firstName} ${result.middleName} ${result.familyName}`,
                yearLevel: yearLevelRecord.name,
                schoolYear: schoolYearRecord.year
            }
        }

    } catch (error) {
        console.error('Error adding registration:', error)

        // Handle specific error cases
        if (error instanceof Error) {
            // Check for unique constraint violations or other specific errors
            if (error.message.includes('Unique constraint')) {
                return {
                    success: false,
                    error: 'A registration with this information already exists.'
                }
            }
        }

        return {
            success: false,
            error: 'An unexpected error occurred while processing your registration. Please try again.'
        }
    }
}
