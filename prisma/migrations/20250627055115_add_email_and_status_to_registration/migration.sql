-- AlterTable
ALTER TABLE "Registration" ADD COLUMN     "emailAddress" VARCHAR(255) NOT NULL DEFAULT '',
ADD COLUMN     "status" VARCHAR(50) NOT NULL DEFAULT 'pending';

-- AlterTable
ALTER TABLE "StudentApplication" ADD COLUMN     "status" VARCHAR(50) NOT NULL DEFAULT 'pending';
