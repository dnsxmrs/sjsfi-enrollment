"use server";

import { prisma } from "@/lib/prisma";
import { logSystemAction } from "@/lib/systemLogger";

interface PersonalData {
    academicYear: string;
    admissionGradeYear: string;
    familyName: string;
    firstName: string;
    middleName: string;
    nickname: string;
    birthDate: string;
    placeOfBirth: string;
    age: string;
    birthOrder: string;
    siblingsCount: string;
    gender: string;
    nationality: string;
    religion: string;
    height: string;
    weight: string;
    bloodType: string;
    languages: string;
    status: string;
    landline: string;
    mobile: string;
    email: string;
    homeAddress: string;
    homeCity: string;
    homeStateProvince: string;
    homeZip: string;
    provincialAddress: string;
    provincialCity: string;
    provincialStateProvince: string;
    provincialZip: string;
    talents: string;
    hobbies: string;
}

interface HealthHistory {
    childhoodDiseases?: string;
    allergies?: string;
    otherMedicalConditions?: string;
    immunizations?: string;
    physicalHandicaps?: string;
}

interface BackgroundInfo {
    familyName?: string;
    firstName?: string;
    middleName?: string;
    birthDate?: string;
    placeOfBirth?: string;
    age?: string;
    nationality?: string;
    religion?: string;
    landlineNumber?: string;
    mobileNumber?: string;
    emailAddress?: string;
    homeAddress?: string;
    city?: string;
    stateProvince?: string;
    zipPostalCode?: string;
    educationalAttainmentCourse?: string;
    occupationalPositionHeld?: string;
    employerCompany?: string;
    companyAddress?: string;
    businessTelephoneNumber?: string;
    annualIncome?: string;
    statusOfParent?: string;
}

interface SchoolInfo {
    name: string;
    address: string;
    gradeYearLevel: string | number;
}

interface TransfereeInfo {
    previousSchool: SchoolInfo;
    presentSchool: SchoolInfo;
    reasonForTransfer: string;
    disciplinaryActions: string;
}

interface FamilyMember {
    familyName?: string;
    firstName?: string;
    middleName?: string;
    birthDate?: string;
    age?: string;
    gradeYearLevel?: string;
    schoolEmployer?: string;
}

interface EducationalBackground {
    gradeYearLevel?: string;
    schoolName?: string;
    schoolAddress?: string;
    inclusiveYears?: string;
    honorsAwardsReceived?: string;
    gradeYearLevelRepeated?: string;
    numberOfSubjectsFailed?: string;
}

interface StudentApplicationData {
    personalData: PersonalData;
    healthHistory: HealthHistory;
    fatherBackground: BackgroundInfo;
    motherBackground: BackgroundInfo;
    guardianBackground: BackgroundInfo;
    transferee: TransfereeInfo;
    familyMembers: FamilyMember[];
    educationalBackground: EducationalBackground[];
    registrationCode?: string;
}

export async function submitStudentApplication(applicationData: StudentApplicationData) {
    try {
        console.log("Starting student application submission...");

        const { personalData, healthHistory, fatherBackground, motherBackground, guardianBackground, registrationCode } = applicationData;

        // Convert string values to appropriate types
        const age = parseInt(personalData.age) || 0;
        const birthOrder = parseInt(personalData.birthOrder) || 0;
        const numberOfSiblings = parseInt(personalData.siblingsCount) || 0;
        const birthdate = new Date(personalData.birthDate);

        // Determine child status enum
        let childStatus: 'LEGITIMATE' | 'ILLEGITIMATE' | 'ADOPTED' | 'STEPCHILD' = 'LEGITIMATE';
        if (personalData.status.toUpperCase() === 'ADOPTED') {
            childStatus = 'ADOPTED';
        } else if (personalData.status.toUpperCase() === 'BIOLOGICAL') {
            childStatus = 'ILLEGITIMATE';
        }

        // Determine gender enum
        const gender: 'MALE' | 'FEMALE' | 'OTHER' | 'PREFER_NOT_TO_SAY' =
            personalData.gender.toUpperCase() === 'MALE' ? 'MALE' :
                personalData.gender.toUpperCase() === 'FEMALE' ? 'FEMALE' : 'OTHER';

        // Start a database transaction
        const result = await prisma.$transaction(async (tx) => {
            // Validate and process registration code if provided
            let registrationCodeRecord = null;
            if (registrationCode) {
                registrationCodeRecord = await tx.registrationCode.findUnique({
                    where: { registrationCode: registrationCode }
                });

                if (!registrationCodeRecord) {
                    throw new Error(`Invalid registration code: ${registrationCode}`);
                }

                if (registrationCodeRecord.status !== 'ACTIVE') {
                    throw new Error(`Registration code ${registrationCode} is not active`);
                }

                if (registrationCodeRecord.expirationDate && new Date() > registrationCodeRecord.expirationDate) {
                    throw new Error(`Registration code ${registrationCode} has expired`);
                }
            }

            // Create the main student application
            const studentApplication = await tx.studentApplication.create({
                data: {
                    academicYear: personalData.academicYear,
                    admissionToGrade: personalData.admissionGradeYear,
                    familyName: personalData.familyName,
                    firstName: personalData.firstName,
                    middleName: personalData.middleName || null,
                    nickName: personalData.nickname || null,
                    birthdate: birthdate,
                    placeOfBirth: personalData.placeOfBirth,
                    age: age,
                    birthOrder: birthOrder,
                    numberOfSiblings: numberOfSiblings,
                    gender: gender,
                    languagesSpokenAtHome: personalData.languages,
                    childStatus: childStatus,
                    landLine: personalData.landline || null,
                    mobileNumber: personalData.mobile,
                    emailAddress: personalData.email,
                    homeAddress: `${personalData.homeAddress}, ${personalData.homeCity}, ${personalData.homeStateProvince}, ${personalData.homeZip}`,
                    city: personalData.homeCity,
                    stateProvince: personalData.homeStateProvince,
                    postalCode: personalData.homeZip,
                    specialSkills: personalData.talents || null,
                    hobbiesInterests: personalData.hobbies || null,
                    status: 'PENDING',
                    createdBy: 1, // You might want to get this from the current user session
                },
            });

            // Create health history if data exists
            if (healthHistory && Object.values(healthHistory).some(value => value)) {
                await tx.healthHistory.create({
                    data: {
                        studentFormId: studentApplication.id,
                        childhoodDiseases: healthHistory.childhoodDiseases || null,
                        allergies: healthHistory.allergies || null,
                        otherMedicalConditions: healthHistory.otherMedicalConditions || null,
                        immunizations: healthHistory.immunizations || null,
                        specificHandicaps: healthHistory.physicalHandicaps || null,
                        createdBy: 1,
                    },
                });
            }

            // Helper function to determine parent status
            const getParentStatus = (status?: string): 'MARRIED' | 'SEPARATED' | 'DIVORCED' | 'WIDOWED' | 'SINGLE' | 'DECEASED' => {
                if (!status) return 'MARRIED';
                const upperStatus = status.toUpperCase();
                if (['MARRIED', 'SEPARATED', 'DIVORCED', 'WIDOWED', 'SINGLE', 'DECEASED'].includes(upperStatus)) {
                    return upperStatus as 'MARRIED' | 'SEPARATED' | 'DIVORCED' | 'WIDOWED' | 'SINGLE' | 'DECEASED';
                }
                return 'MARRIED';
            };

            // Create father background if data exists
            if (fatherBackground && Object.values(fatherBackground).some(value => value)) {
                await tx.familyBackground.create({
                    data: {
                        studentFormId: studentApplication.id,
                        guardianType: 'FATHER',
                        familyName: fatherBackground.familyName || '',
                        firstName: fatherBackground.firstName || '',
                        middleName: fatherBackground.middleName || null,
                        birthdate: fatherBackground.birthDate ? new Date(fatherBackground.birthDate) : new Date(),
                        placeOfBirth: fatherBackground.placeOfBirth || '',
                        age: parseInt(fatherBackground.age || '0') || 0,
                        nationality: fatherBackground.nationality || '',
                        religion: fatherBackground.religion || '',
                        landLine: fatherBackground.landlineNumber || null,
                        mobileNo: fatherBackground.mobileNumber || '',
                        emailAddress: fatherBackground.emailAddress || '',
                        homeAddress: fatherBackground.homeAddress || '',
                        city: fatherBackground.city || '',
                        stateProvince: fatherBackground.stateProvince || '',
                        postalCode: fatherBackground.zipPostalCode || '',
                        educationalAttainment: fatherBackground.educationalAttainmentCourse || '',
                        occupation: fatherBackground.occupationalPositionHeld || '',
                        employer: fatherBackground.employerCompany || null,
                        companyAddress: fatherBackground.companyAddress || null,
                        businessNo: fatherBackground.businessTelephoneNumber || null,
                        annualIncome: fatherBackground.annualIncome ? parseFloat(fatherBackground.annualIncome) : null,
                        parentStatus: getParentStatus(fatherBackground.statusOfParent),
                        createdBy: 1,
                    },
                });
            }

            // Create mother background if data exists
            if (motherBackground && Object.values(motherBackground).some(value => value)) {
                await tx.familyBackground.create({
                    data: {
                        studentFormId: studentApplication.id,
                        guardianType: 'MOTHER',
                        familyName: motherBackground.familyName || '',
                        firstName: motherBackground.firstName || '',
                        middleName: motherBackground.middleName || null,
                        birthdate: motherBackground.birthDate ? new Date(motherBackground.birthDate) : new Date(),
                        placeOfBirth: motherBackground.placeOfBirth || '',
                        age: parseInt(motherBackground.age || '0') || 0,
                        nationality: motherBackground.nationality || '',
                        religion: motherBackground.religion || '',
                        landLine: motherBackground.landlineNumber || null,
                        mobileNo: motherBackground.mobileNumber || '',
                        emailAddress: motherBackground.emailAddress || '',
                        homeAddress: motherBackground.homeAddress || '',
                        city: motherBackground.city || '',
                        stateProvince: motherBackground.stateProvince || '',
                        postalCode: motherBackground.zipPostalCode || '',
                        educationalAttainment: motherBackground.educationalAttainmentCourse || '',
                        occupation: motherBackground.occupationalPositionHeld || '',
                        employer: motherBackground.employerCompany || null,
                        companyAddress: motherBackground.companyAddress || null,
                        businessNo: motherBackground.businessTelephoneNumber || null,
                        annualIncome: motherBackground.annualIncome ? parseFloat(motherBackground.annualIncome) : null,
                        parentStatus: getParentStatus(motherBackground.statusOfParent),
                        createdBy: 1,
                    },
                });
            }

            // Create guardian background if data exists
            if (guardianBackground && Object.values(guardianBackground).some(value => value)) {
                await tx.familyBackground.create({
                    data: {
                        studentFormId: studentApplication.id,
                        guardianType: 'GUARDIAN',
                        familyName: guardianBackground.familyName || '',
                        firstName: guardianBackground.firstName || '',
                        middleName: guardianBackground.middleName || null,
                        birthdate: guardianBackground.birthDate ? new Date(guardianBackground.birthDate) : new Date(),
                        placeOfBirth: guardianBackground.placeOfBirth || '',
                        age: parseInt(guardianBackground.age || '0') || 0,
                        nationality: guardianBackground.nationality || '',
                        religion: guardianBackground.religion || '',
                        landLine: guardianBackground.landlineNumber || null,
                        mobileNo: guardianBackground.mobileNumber || '',
                        emailAddress: guardianBackground.emailAddress || '',
                        homeAddress: guardianBackground.homeAddress || '',
                        city: guardianBackground.city || '',
                        stateProvince: guardianBackground.stateProvince || '',
                        postalCode: guardianBackground.zipPostalCode || '',
                        educationalAttainment: guardianBackground.educationalAttainmentCourse || '',
                        occupation: guardianBackground.occupationalPositionHeld || '',
                        employer: guardianBackground.employerCompany || null,
                        companyAddress: guardianBackground.companyAddress || null,
                        businessNo: guardianBackground.businessTelephoneNumber || null,
                        annualIncome: guardianBackground.annualIncome ? parseFloat(guardianBackground.annualIncome) : null,
                        parentStatus: getParentStatus(guardianBackground.statusOfParent),
                        createdBy: 1,
                    },
                });
            }

            // Update registration code status if it was used
            if (registrationCodeRecord) {
                await tx.registrationCode.update({
                    where: { id: registrationCodeRecord.id },
                    data: {
                        status: 'INACTIVE',
                        applicationId: studentApplication.id
                    }
                });
            }

            return studentApplication;
        });

        // Log the successful application submission
        await logSystemAction({
            actionCategory: 'REGISTRATION',
            actionType: 'CREATE',
            actionDescription: `Student application submitted for ${personalData.firstName} ${personalData.familyName}${registrationCode ? ` using registration code: ${registrationCode}` : ''}`,
            targetType: 'STUDENT_APPLICATION',
            targetId: result.id.toString(),
            targetName: `${personalData.firstName} ${personalData.familyName}`,
            status: 'SUCCESS',
            severityLevel: 'MEDIUM',
            metadata: {
                applicationId: result.id,
                studentName: `${personalData.firstName} ${personalData.familyName}`,
                academicYear: personalData.academicYear,
                admissionGrade: personalData.admissionGradeYear,
                registrationCode: registrationCode || null,
            },
        });

        console.log("Student application submitted successfully:", result.id);

        return {
            success: true,
            applicationId: result.id,
            message: "Student application submitted successfully!",
        };

    } catch (error) {
        console.error("Error submitting student application:", error);

        // Log the failed application submission
        await logSystemAction({
            actionCategory: 'REGISTRATION',
            actionType: 'CREATE',
            actionDescription: `Failed to submit student application for ${applicationData.personalData.firstName} ${applicationData.personalData.familyName}`,
            targetType: 'STUDENT_APPLICATION',
            targetId: 'unknown',
            targetName: `${applicationData.personalData.firstName} ${applicationData.personalData.familyName}`,
            status: 'FAILED',
            errorMessage: error instanceof Error ? error.message : 'Unknown error',
            severityLevel: 'HIGH',
        });

        return {
            success: false,
            error: error instanceof Error ? error.message : "An unknown error occurred while submitting the application.",
        };
    }
}
