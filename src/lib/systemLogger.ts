"use server";

import { prisma } from "@/lib/prisma";
import { headers } from 'next/headers';
import type { ReadonlyHeaders } from 'next/dist/server/web/spec-extension/adapters/headers';
import { LogSystemActionParams, LogData, sanitizeForLoggingSync, getChangedFieldsSync } from './systemLoggerTypes';

// Main system logger function
export async function logSystemAction(params: LogSystemActionParams): Promise<void> {
    try {
        // Generate unique log number
        const logNumber = await generateLogNumber();

        // Auto-detect system context if not provided
        const systemContext = await getSystemContext();

        // Create the log entry
        await prisma.systemLog.create({
            data: {
                logNumber,
                timestamp: new Date(),

                // User context
                userId: params.userId,
                userName: params.userName,
                userRole: params.userRole,
                sessionId: params.sessionId,

                // Action details
                actionCategory: params.actionCategory,
                actionType: params.actionType,
                actionSubType: params.actionSubType,
                actionDescription: params.actionDescription,

                // Target information
                targetType: params.targetType,
                targetId: params.targetId,
                targetName: params.targetName,

                // Change tracking
                oldValues: params.oldValues || undefined,
                newValues: params.newValues || undefined,
                changedFields: params.changedFields || [],

                // System context
                ipAddress: params.ipAddress || systemContext.ipAddress,
                userAgent: params.userAgent || systemContext.userAgent,
                requestMethod: params.requestMethod || systemContext.requestMethod,
                requestUrl: params.requestUrl || systemContext.requestUrl,

                // Status and results
                status: params.status,
                errorCode: params.errorCode,
                errorMessage: params.errorMessage,
                severityLevel: params.severityLevel,

                // Performance and metadata
                executionTimeMs: params.executionTimeMs,
                metadata: params.metadata || undefined,
                isSensitiveData: params.isSensitiveData || false,
            }
        });

        // If it's a critical event, you might want to trigger alerts
        if (params.severityLevel === 'CRITICAL') {
            await handleCriticalEvent(params);
        }

    } catch (error) {
        // Fallback logging - don't let logging errors break the main function
        console.error('Failed to log system action:', error);
        console.error('Original log params:', JSON.stringify(params, null, 2));

        // You might want to write to a fallback log file or external service here
        await fallbackLogger(params, error);
    }
}

// Generate unique log number with format: LOG-YYYYMM-XXXXXX
async function generateLogNumber(): Promise<string> {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const prefix = `LOG-${year}${month}`;

    try {
        // Get the latest log number for this month
        const latestLog = await prisma.systemLog.findFirst({
            where: {
                logNumber: {
                    startsWith: prefix
                }
            },
            orderBy: {
                createdAt: 'desc'
            },
            select: {
                logNumber: true
            }
        });

        let sequence = 1;
        if (latestLog) {
            const lastSequence = parseInt(latestLog.logNumber.split('-').pop() || '0');
            sequence = lastSequence + 1;
        }

        return `${prefix}-${String(sequence).padStart(6, '0')}`;
    } catch {
        // If database query fails, generate a timestamp-based number
        const timestamp = Date.now().toString().slice(-6);
        return `${prefix}-${timestamp}`;
    }
}

// Auto-detect system context from Next.js headers
async function getSystemContext() {
    try {
        const headersList = await headers();

        return {
            ipAddress: getClientIP(headersList),
            userAgent: headersList.get('user-agent') || undefined,
            requestMethod: headersList.get('x-http-method') || 'UNKNOWN',
            requestUrl: headersList.get('x-pathname') || headersList.get('referer') || undefined,
        };
    } catch {
        return {
            ipAddress: undefined,
            userAgent: undefined,
            requestMethod: undefined,
            requestUrl: undefined,
        };
    }
}

// Extract client IP from headers
function getClientIP(headersList: ReadonlyHeaders): string | undefined {
    const forwardedFor = headersList.get('x-forwarded-for');
    const realIP = headersList.get('x-real-ip');
    const remoteAddr = headersList.get('remote-addr');

    if (forwardedFor) {
        return forwardedFor.split(',')[0].trim();
    }

    return realIP || remoteAddr || undefined;
}

// Handle critical events (alerts, notifications, etc.)
async function handleCriticalEvent(params: LogSystemActionParams): Promise<void> {
    try {
        // You can implement critical event handling here:
        // - Send email alerts
        // - Trigger webhooks
        // - Create system notifications
        // - Log to external monitoring services

        console.warn('CRITICAL EVENT DETECTED:', {
            action: params.actionDescription,
            user: params.userName,
            time: new Date().toISOString(),
            error: params.errorMessage
        });

        // Example: You could send to an external monitoring service
        // await sendToMonitoringService(params);

    } catch (error) {
        console.error('Failed to handle critical event:', error);
    }
}

// Fallback logging when main logging fails
async function fallbackLogger(params: LogSystemActionParams, error: Error | unknown): Promise<void> {
    try {
        // Write to console with structured format
        const fallbackLog = {
            timestamp: new Date().toISOString(),
            level: 'ERROR',
            message: 'System logging failed',
            originalAction: {
                category: params.actionCategory,
                type: params.actionType,
                description: params.actionDescription,
                user: params.userName,
                target: `${params.targetType}#${params.targetId}`,
                status: params.status,
                severity: params.severityLevel
            },
            error: error instanceof Error ? error.message : 'Unknown error'
        };

        console.error('FALLBACK LOG:', JSON.stringify(fallbackLog, null, 2));

        // You could also write to a file, send to external service, etc.
        // await writeToLogFile(fallbackLog);
        // await sendToExternalService(fallbackLog);

    } catch (fallbackError) {
        console.error('Even fallback logging failed:', fallbackError);
    }
}

// Utility function to compare objects and get changed fields
export async function getChangedFields(oldValues: LogData, newValues: LogData): Promise<string[]> {
    return getChangedFieldsSync(oldValues, newValues);
}

// Utility function to sanitize sensitive data
export async function sanitizeForLogging(data: LogData, sensitiveFields: string[] = []): Promise<LogData> {
    return sanitizeForLoggingSync(data, sensitiveFields);
}
