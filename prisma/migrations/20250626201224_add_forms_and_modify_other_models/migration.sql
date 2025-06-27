/*
  Warnings:

  - You are about to drop the column `lastName` on the `User` table. All the data in the column will be lost.
  - Added the required column `studentId` to the `RegForm` table without a default value. This is not possible if the table is not empty.
  - Added the required column `studentId` to the `StudentForm` table without a default value. This is not possible if the table is not empty.
  - Added the required column `familyName` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RegForm" ADD COLUMN     "studentId" INTEGER NOT NULL,
ALTER COLUMN "registrationStatus" SET DEFAULT 'pending',
ALTER COLUMN "registrationStatus" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "StudentForm" ADD COLUMN     "studentId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "lastName",
ADD COLUMN     "familyName" VARCHAR(255) NOT NULL;

-- AddForeignKey
ALTER TABLE "RegForm" ADD CONSTRAINT "RegForm_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentForm" ADD CONSTRAINT "StudentForm_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
