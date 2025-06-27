/*
  Warnings:

  - You are about to drop the column `grade` on the `Grade` table. All the data in the column will be lost.
  - You are about to drop the column `quarter` on the `Grade` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `passwordHashed` on the `User` table. All the data in the column will be lost.
  - Added the required column `finalGrade` to the `Grade` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstGrading` to the `Grade` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fourthGrading` to the `Grade` table without a default value. This is not possible if the table is not empty.
  - Added the required column `secondGrading` to the `Grade` table without a default value. This is not possible if the table is not empty.
  - Added the required column `thirdGrading` to the `Grade` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Grade" DROP COLUMN "grade",
DROP COLUMN "quarter",
ADD COLUMN     "finalGrade" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "firstGrading" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "fourthGrading" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "secondGrading" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "thirdGrading" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "Student" ALTER COLUMN "dateOfBirth" SET DATA TYPE DATE;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "name",
DROP COLUMN "passwordHashed",
ADD COLUMN     "firstName" VARCHAR(255) NOT NULL,
ADD COLUMN     "lastName" VARCHAR(255) NOT NULL,
ADD COLUMN     "middleName" VARCHAR(255),
ADD COLUMN     "suffix" VARCHAR(50);

-- CreateTable
CREATE TABLE "Feedback" (
    "id" SERIAL NOT NULL,
    "type" VARCHAR(50) NOT NULL,
    "message" TEXT NOT NULL,
    "suggestion" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Feedback_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RegForm" (
    "id" SERIAL NOT NULL,
    "schoolYear" VARCHAR(20) NOT NULL,
    "newStudent" BOOLEAN NOT NULL DEFAULT false,
    "gradeYear" VARCHAR(50) NOT NULL,
    "studentNo" VARCHAR(100) NOT NULL,
    "familyName" VARCHAR(255) NOT NULL,
    "firstName" VARCHAR(255) NOT NULL,
    "middleName" VARCHAR(255) NOT NULL,
    "birthdate" DATE NOT NULL,
    "placeOfBirth" VARCHAR(255) NOT NULL,
    "age" INTEGER NOT NULL,
    "gender" BOOLEAN NOT NULL,
    "streetAddress" VARCHAR(255) NOT NULL,
    "city" VARCHAR(100) NOT NULL,
    "stateProvince" VARCHAR(100) NOT NULL,
    "g1FamilyName" VARCHAR(255) NOT NULL,
    "g1FirstName" VARCHAR(255) NOT NULL,
    "g1MiddleName" VARCHAR(255) NOT NULL,
    "g1Occupation" VARCHAR(100) NOT NULL,
    "g1RelationToStudent" VARCHAR(100) NOT NULL,
    "g2FamilyName" VARCHAR(255) NOT NULL,
    "g2FirstName" VARCHAR(255) NOT NULL,
    "g2MiddleName" VARCHAR(255) NOT NULL,
    "g2Occupation" VARCHAR(100) NOT NULL,
    "g2RelationToStudent" VARCHAR(100) NOT NULL,
    "contactNo" VARCHAR(50),
    "modeOfPayment" VARCHAR(50) NOT NULL,
    "amountPayable" INTEGER NOT NULL,
    "registrationStatus" INTEGER NOT NULL DEFAULT 0,
    "signedBy" INTEGER,
    "createdBy" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RegForm_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudentForm" (
    "id" SERIAL NOT NULL,
    "regFormId" INTEGER NOT NULL,
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

    CONSTRAINT "StudentForm_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HealthHistory" (
    "id" SERIAL NOT NULL,
    "studentFormId" INTEGER NOT NULL,
    "childhoodDiseases" TEXT NOT NULL,
    "allergies" TEXT NOT NULL,
    "otherMedicalConditions" TEXT NOT NULL,
    "immunizations" TEXT NOT NULL,
    "specificHandicaps" TEXT NOT NULL,
    "createdBy" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HealthHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FamilyBackground" (
    "id" SERIAL NOT NULL,
    "studentFormId" INTEGER NOT NULL,
    "guardianType" INTEGER NOT NULL,
    "familyName" VARCHAR(255) NOT NULL,
    "firstName" VARCHAR(255) NOT NULL,
    "middleName" VARCHAR(255) NOT NULL,
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
    "employer" VARCHAR(255) NOT NULL,
    "companyAddress" VARCHAR(255) NOT NULL,
    "companyCity" VARCHAR(100) NOT NULL,
    "businessNo" VARCHAR(50) NOT NULL,
    "annualIncome" INTEGER NOT NULL,
    "parentStatus" INTEGER NOT NULL,
    "createdBy" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FamilyBackground_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "HealthHistory_studentFormId_key" ON "HealthHistory"("studentFormId");

-- AddForeignKey
ALTER TABLE "StudentForm" ADD CONSTRAINT "StudentForm_regFormId_fkey" FOREIGN KEY ("regFormId") REFERENCES "RegForm"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HealthHistory" ADD CONSTRAINT "HealthHistory_studentFormId_fkey" FOREIGN KEY ("studentFormId") REFERENCES "StudentForm"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FamilyBackground" ADD CONSTRAINT "FamilyBackground_studentFormId_fkey" FOREIGN KEY ("studentFormId") REFERENCES "StudentForm"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
