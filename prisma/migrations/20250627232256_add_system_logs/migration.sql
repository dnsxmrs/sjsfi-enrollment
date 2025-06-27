-- CreateEnum
CREATE TYPE "LogStatus" AS ENUM ('SUCCESS', 'FAILED', 'WARNING');

-- CreateEnum
CREATE TYPE "SeverityLevel" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL');

-- CreateTable
CREATE TABLE "SystemLog" (
    "id" TEXT NOT NULL,
    "logNumber" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER,
    "userName" TEXT,
    "userRole" TEXT,
    "sessionId" TEXT,
    "actionCategory" TEXT NOT NULL,
    "actionType" TEXT NOT NULL,
    "actionSubType" TEXT,
    "actionDescription" TEXT NOT NULL,
    "targetType" TEXT NOT NULL,
    "targetId" TEXT NOT NULL,
    "targetName" TEXT,
    "oldValues" JSONB,
    "newValues" JSONB,
    "changedFields" TEXT[],
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "requestMethod" TEXT,
    "requestUrl" TEXT,
    "status" "LogStatus" NOT NULL,
    "errorCode" TEXT,
    "errorMessage" TEXT,
    "severityLevel" "SeverityLevel" NOT NULL,
    "executionTimeMs" INTEGER,
    "metadata" JSONB,
    "isSensitiveData" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "archivedAt" TIMESTAMP(3),

    CONSTRAINT "SystemLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SystemLog_logNumber_key" ON "SystemLog"("logNumber");
