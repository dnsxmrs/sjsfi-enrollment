/*
  Warnings:

  - You are about to drop the `RegForm` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `StudentForm` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "RegistrationType" AS ENUM ('NEW', 'OLD', 'TRANSFER');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE');

-- DropForeignKey
ALTER TABLE "FamilyBackground" DROP CONSTRAINT "FamilyBackground_studentFormId_fkey";

-- DropForeignKey
ALTER TABLE "HealthHistory" DROP CONSTRAINT "HealthHistory_studentFormId_fkey";

-- DropForeignKey
ALTER TABLE "RegForm" DROP CONSTRAINT "RegForm_studentId_fkey";

-- DropForeignKey
ALTER TABLE "StudentForm" DROP CONSTRAINT "StudentForm_regFormId_fkey";

-- DropForeignKey
ALTER TABLE "StudentForm" DROP CONSTRAINT "StudentForm_studentId_fkey";

-- DropTable
DROP TABLE "RegForm";

-- DropTable
DROP TABLE "StudentForm";

-- CreateTable
CREATE TABLE "YearLevel" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "YearLevel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SchoolYear" (
    "id" SERIAL NOT NULL,
    "year" VARCHAR(20) NOT NULL,
    "startDate" DATE NOT NULL,
    "endDate" DATE NOT NULL,
    "status" VARCHAR(50) NOT NULL DEFAULT 'active',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "SchoolYear_pkey" PRIMARY KEY ("id")
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
    "middleName" VARCHAR(255) NOT NULL,
    "birthdate" DATE NOT NULL,
    "placeOfBirth" VARCHAR(255) NOT NULL,
    "age" INTEGER NOT NULL,
    "gender" "Gender" NOT NULL,
    "streetAddress" VARCHAR(255) NOT NULL,
    "city" VARCHAR(100) NOT NULL,
    "stateProvince" VARCHAR(100) NOT NULL,
    "postalCode" VARCHAR(20) NOT NULL,
    "modeOfPayment" VARCHAR(50) NOT NULL,
    "amountPayable" INTEGER NOT NULL,
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
    "middleName" VARCHAR(255) NOT NULL,
    "occupation" VARCHAR(100) NOT NULL,
    "relationToStudent" VARCHAR(100) NOT NULL,
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
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "ContactNumber_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Requirements" (
    "id" SERIAL NOT NULL,
    "requirementType" VARCHAR(100) NOT NULL,
    "status" VARCHAR(50) NOT NULL DEFAULT 'pending',
    "fileUrl" VARCHAR(255),
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
    "middleName" VARCHAR(255) NOT NULL,
    "nickName" VARCHAR(100),
    "birthdate" DATE NOT NULL,
    "placeOfBirth" VARCHAR(255) NOT NULL,
    "age" INTEGER NOT NULL,
    "birthOrder" INTEGER NOT NULL,
    "numberOfSiblings" INTEGER NOT NULL,
    "gender" BOOLEAN NOT NULL,
    "languagesSpokenAtHome" VARCHAR(255) NOT NULL,
    "childStatus" INTEGER,
    "landLine" VARCHAR(50),
    "mobileNumber" VARCHAR(50) NOT NULL,
    "emailAddress" VARCHAR(255) NOT NULL,
    "homeAddress" VARCHAR(255) NOT NULL,
    "city" VARCHAR(100) NOT NULL,
    "stateProvince" VARCHAR(100) NOT NULL,
    "postalCode" VARCHAR(20) NOT NULL,
    "specialSkills" TEXT NOT NULL,
    "hobbiesInterests" TEXT NOT NULL,
    "createdBy" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StudentApplication_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GeneralPolicy" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "GeneralPolicy_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "YearLevel_name_key" ON "YearLevel"("name");

-- CreateIndex
CREATE UNIQUE INDEX "SchoolYear_year_key" ON "SchoolYear"("year");

-- AddForeignKey
ALTER TABLE "Registration" ADD CONSTRAINT "Registration_studentApplicationId_fkey" FOREIGN KEY ("studentApplicationId") REFERENCES "StudentApplication"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Registration" ADD CONSTRAINT "Registration_yearLevelRef_fkey" FOREIGN KEY ("yearLevelRef") REFERENCES "YearLevel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Registration" ADD CONSTRAINT "Registration_schoolYearRef_fkey" FOREIGN KEY ("schoolYearRef") REFERENCES "SchoolYear"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Guardian" ADD CONSTRAINT "Guardian_registrationId_fkey" FOREIGN KEY ("registrationId") REFERENCES "Registration"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContactNumber" ADD CONSTRAINT "ContactNumber_registrationId_fkey" FOREIGN KEY ("registrationId") REFERENCES "Registration"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HealthHistory" ADD CONSTRAINT "HealthHistory_studentFormId_fkey" FOREIGN KEY ("studentFormId") REFERENCES "StudentApplication"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FamilyBackground" ADD CONSTRAINT "FamilyBackground_studentFormId_fkey" FOREIGN KEY ("studentFormId") REFERENCES "StudentApplication"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
