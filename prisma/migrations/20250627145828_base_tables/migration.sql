-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'OTHER', 'PREFER_NOT_TO_SAY');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('STUDENT', 'ADMIN', 'TEACHER', 'PARENT', 'STAFF');

-- CreateEnum
CREATE TYPE "GeneralStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'SUSPENDED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "RegistrationType" AS ENUM ('NEW', 'OLD', 'TRANSFER', 'RETURNING');

-- CreateEnum
CREATE TYPE "RegistrationStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED', 'CANCELLED', 'EXPIRED');

-- CreateEnum
CREATE TYPE "CodeStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'EXPIRED');

-- CreateEnum
CREATE TYPE "RequirementStatus" AS ENUM ('PENDING', 'SUBMITTED', 'APPROVED', 'REJECTED', 'INCOMPLETE');

-- CreateEnum
CREATE TYPE "FeedbackType" AS ENUM ('COMPLAINT', 'SUGGESTION', 'COMPLIMENT', 'BUG_REPORT', 'FEATURE_REQUEST');

-- CreateEnum
CREATE TYPE "ApplicationStatus" AS ENUM ('PENDING', 'UNDER_REVIEW', 'APPROVED', 'REJECTED', 'WAITLISTED');

-- CreateEnum
CREATE TYPE "GuardianType" AS ENUM ('FATHER', 'MOTHER', 'GUARDIAN', 'GRANDFATHER', 'GRANDMOTHER', 'UNCLE', 'AUNT', 'SIBLING', 'OTHER');

-- CreateEnum
CREATE TYPE "ChildStatus" AS ENUM ('LEGITIMATE', 'ILLEGITIMATE', 'ADOPTED', 'STEPCHILD');

-- CreateEnum
CREATE TYPE "ParentStatus" AS ENUM ('MARRIED', 'SEPARATED', 'DIVORCED', 'WIDOWED', 'SINGLE', 'DECEASED');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'STUDENT',
    "status" "GeneralStatus" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "firstName" VARCHAR(255) NOT NULL,
    "middleName" VARCHAR(255),
    "familyName" VARCHAR(255) NOT NULL,
    "suffix" VARCHAR(50),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Student" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "studentNumber" VARCHAR(100) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Feedback" (
    "id" SERIAL NOT NULL,
    "type" "FeedbackType" NOT NULL,
    "message" TEXT NOT NULL,
    "suggestion" TEXT,
    "status" "GeneralStatus" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Feedback_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "YearLevel" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "status" "GeneralStatus" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "YearLevel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AcademicTerm" (
    "id" SERIAL NOT NULL,
    "year" VARCHAR(20) NOT NULL,
    "startDate" DATE NOT NULL,
    "endDate" DATE NOT NULL,
    "status" "GeneralStatus" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "AcademicTerm_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Registration" (
    "id" SERIAL NOT NULL,
    "studentApplicationId" INTEGER,
    "schoolYearRef" INTEGER NOT NULL,
    "registrationType" "RegistrationType" NOT NULL DEFAULT 'NEW',
    "yearLevelRef" INTEGER NOT NULL,
    "studentNo" VARCHAR(100) NOT NULL,
    "familyName" VARCHAR(255) NOT NULL,
    "firstName" VARCHAR(255) NOT NULL,
    "middleName" VARCHAR(255),
    "birthdate" DATE NOT NULL,
    "placeOfBirth" VARCHAR(255) NOT NULL,
    "age" INTEGER NOT NULL,
    "gender" "Gender" NOT NULL,
    "streetAddress" VARCHAR(255) NOT NULL,
    "city" VARCHAR(100) NOT NULL,
    "stateProvince" VARCHAR(100) NOT NULL,
    "postalCode" VARCHAR(20) NOT NULL,
    "modeOfPayment" VARCHAR(50) NOT NULL,
    "amountPayable" DECIMAL(10,2) NOT NULL,
    "emailAddress" VARCHAR(255) NOT NULL,
    "status" "RegistrationStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Registration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Guardian" (
    "id" SERIAL NOT NULL,
    "registrationId" INTEGER NOT NULL,
    "familyName" VARCHAR(255) NOT NULL,
    "firstName" VARCHAR(255) NOT NULL,
    "middleName" VARCHAR(255),
    "occupation" VARCHAR(100) NOT NULL,
    "relationToStudent" VARCHAR(100) NOT NULL,
    "status" "GeneralStatus" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Guardian_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContactNumber" (
    "id" SERIAL NOT NULL,
    "registrationId" INTEGER NOT NULL,
    "number" VARCHAR(50) NOT NULL,
    "type" VARCHAR(20),
    "status" "GeneralStatus" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "ContactNumber_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Requirements" (
    "id" SERIAL NOT NULL,
    "requirementType" VARCHAR(100) NOT NULL,
    "status" "RequirementStatus" NOT NULL DEFAULT 'PENDING',
    "fileUrl" VARCHAR(255),
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Requirements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudentApplication" (
    "id" SERIAL NOT NULL,
    "academicYear" VARCHAR(20) NOT NULL,
    "admissionToGrade" VARCHAR(50) NOT NULL,
    "familyName" VARCHAR(255) NOT NULL,
    "firstName" VARCHAR(255) NOT NULL,
    "middleName" VARCHAR(255),
    "nickName" VARCHAR(100),
    "birthdate" DATE NOT NULL,
    "placeOfBirth" VARCHAR(255) NOT NULL,
    "age" INTEGER NOT NULL,
    "birthOrder" INTEGER NOT NULL,
    "numberOfSiblings" INTEGER NOT NULL,
    "gender" "Gender" NOT NULL,
    "languagesSpokenAtHome" VARCHAR(255) NOT NULL,
    "childStatus" "ChildStatus",
    "landLine" VARCHAR(50),
    "mobileNumber" VARCHAR(50) NOT NULL,
    "emailAddress" VARCHAR(255) NOT NULL,
    "homeAddress" VARCHAR(255) NOT NULL,
    "city" VARCHAR(100) NOT NULL,
    "stateProvince" VARCHAR(100) NOT NULL,
    "postalCode" VARCHAR(20) NOT NULL,
    "specialSkills" TEXT,
    "hobbiesInterests" TEXT,
    "status" "ApplicationStatus" NOT NULL DEFAULT 'PENDING',
    "createdBy" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "StudentApplication_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HealthHistory" (
    "id" SERIAL NOT NULL,
    "studentFormId" INTEGER NOT NULL,
    "childhoodDiseases" TEXT,
    "allergies" TEXT,
    "otherMedicalConditions" TEXT,
    "immunizations" TEXT,
    "specificHandicaps" TEXT,
    "createdBy" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "HealthHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FamilyBackground" (
    "id" SERIAL NOT NULL,
    "studentFormId" INTEGER NOT NULL,
    "guardianType" "GuardianType" NOT NULL,
    "familyName" VARCHAR(255) NOT NULL,
    "firstName" VARCHAR(255) NOT NULL,
    "middleName" VARCHAR(255),
    "birthdate" DATE NOT NULL,
    "placeOfBirth" VARCHAR(255) NOT NULL,
    "age" INTEGER NOT NULL,
    "nationality" VARCHAR(100) NOT NULL,
    "religion" VARCHAR(100) NOT NULL,
    "landLine" VARCHAR(50),
    "mobileNo" VARCHAR(50) NOT NULL,
    "emailAddress" VARCHAR(255) NOT NULL,
    "homeAddress" VARCHAR(255) NOT NULL,
    "city" VARCHAR(100) NOT NULL,
    "stateProvince" VARCHAR(100) NOT NULL,
    "postalCode" VARCHAR(20) NOT NULL,
    "educationalAttainment" VARCHAR(255) NOT NULL,
    "occupation" VARCHAR(100) NOT NULL,
    "employer" VARCHAR(255),
    "companyAddress" VARCHAR(255),
    "companyCity" VARCHAR(100),
    "businessNo" VARCHAR(50),
    "annualIncome" DECIMAL(12,2),
    "parentStatus" "ParentStatus" NOT NULL,
    "createdBy" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "FamilyBackground_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RegistrationCode" (
    "id" SERIAL NOT NULL,
    "registrationCode" VARCHAR(20) NOT NULL,
    "status" "CodeStatus" NOT NULL DEFAULT 'ACTIVE',
    "expirationDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "registrationId" INTEGER,
    "applicationId" INTEGER,

    CONSTRAINT "RegistrationCode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GeneralPolicy" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "content" TEXT NOT NULL,
    "status" "GeneralStatus" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "GeneralPolicy_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Student_userId_key" ON "Student"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Student_studentNumber_key" ON "Student"("studentNumber");

-- CreateIndex
CREATE UNIQUE INDEX "YearLevel_name_key" ON "YearLevel"("name");

-- CreateIndex
CREATE UNIQUE INDEX "AcademicTerm_year_key" ON "AcademicTerm"("year");

-- CreateIndex
CREATE UNIQUE INDEX "Registration_studentNo_key" ON "Registration"("studentNo");

-- CreateIndex
CREATE UNIQUE INDEX "HealthHistory_studentFormId_key" ON "HealthHistory"("studentFormId");

-- CreateIndex
CREATE UNIQUE INDEX "RegistrationCode_registrationCode_key" ON "RegistrationCode"("registrationCode");

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Registration" ADD CONSTRAINT "Registration_schoolYearRef_fkey" FOREIGN KEY ("schoolYearRef") REFERENCES "AcademicTerm"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Registration" ADD CONSTRAINT "Registration_studentApplicationId_fkey" FOREIGN KEY ("studentApplicationId") REFERENCES "StudentApplication"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Registration" ADD CONSTRAINT "Registration_yearLevelRef_fkey" FOREIGN KEY ("yearLevelRef") REFERENCES "YearLevel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Guardian" ADD CONSTRAINT "Guardian_registrationId_fkey" FOREIGN KEY ("registrationId") REFERENCES "Registration"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContactNumber" ADD CONSTRAINT "ContactNumber_registrationId_fkey" FOREIGN KEY ("registrationId") REFERENCES "Registration"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HealthHistory" ADD CONSTRAINT "HealthHistory_studentFormId_fkey" FOREIGN KEY ("studentFormId") REFERENCES "StudentApplication"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FamilyBackground" ADD CONSTRAINT "FamilyBackground_studentFormId_fkey" FOREIGN KEY ("studentFormId") REFERENCES "StudentApplication"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RegistrationCode" ADD CONSTRAINT "RegistrationCode_registrationId_fkey" FOREIGN KEY ("registrationId") REFERENCES "Registration"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RegistrationCode" ADD CONSTRAINT "RegistrationCode_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "StudentApplication"("id") ON DELETE SET NULL ON UPDATE CASCADE;
