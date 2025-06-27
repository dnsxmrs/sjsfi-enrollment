"use server";

import { prisma } from "@/lib/prisma";
import { headers } from 'next/headers';
import type { ReadonlyHeaders } from 'next/dist/server/web/spec-extension/adapters/headers';

// Types for logging data
type LoggableValue = string | number | boolean | null | Date | LoggableValue[] | { [key: string]: LoggableValue };
export type LogData = Record<string, LoggableValue>;

// Types for the system logger
export interface LogSystemActionParams {
    // User context (optional for system actions)
    userId?: number;
    userName?: string;
    userRole?: string;
    sessionId?: string;

    // Action details (required)
    actionCategory: 'AUTH' | 'REGISTRATION' | 'ACADEMIC' | 'USER' | 'SYSTEM' | 'SECURITY';
    actionType: 'CREATE' | 'UPDATE' | 'DELETE' | 'LOGIN' | 'LOGOUT' | 'EXPORT' | 'IMPORT' | 'VIEW' | 'PASSWORD_CHANGE' | 'UNAUTHORIZED_ACCESS' | 'SUSPICIOUS_ACTIVITY' | 'DATA_BREACH' | 'BRUTE_FORCE';
    actionSubType?: string;
    actionDescription: string;

    // Target information (required)
    targetType: string;
    targetId: string;
    targetName?: string;

    // Change tracking (optional)
    oldValues?: LogData;
    newValues?: LogData;
    changedFields?: string[];

    // System context (auto-detected if not provided)
    ipAddress?: string;
    userAgent?: string;
    requestMethod?: string;
    requestUrl?: string;

    // Status and results (required)
    status: 'SUCCESS' | 'FAILED' | 'WARNING';
    errorCode?: string;
    errorMessage?: string;
    severityLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

    // Performance and metadata (optional)
    executionTimeMs?: number;
    metadata?: LogData;
    isSensitiveData?: boolean;
}

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
export function getChangedFields(oldValues: LogData, newValues: LogData): string[] {
    if (!oldValues || !newValues) return [];

    const changedFields: string[] = [];
    const allKeys = new Set([...Object.keys(oldValues), ...Object.keys(newValues)]);

    for (const key of allKeys) {
        if (JSON.stringify(oldValues[key]) !== JSON.stringify(newValues[key])) {
            changedFields.push(key);
        }
    }

    return changedFields;
}

// Utility function to sanitize sensitive data
export function sanitizeForLogging(data: LogData, sensitiveFields: string[] = []): LogData {
    if (!data || typeof data !== 'object') return data;

    const defaultSensitiveFields = [
        'password', 'token', 'secret', 'key', 'ssn', 'creditCard',
        'bankAccount', 'socialSecurity', 'passcode', 'pin'
    ];

    const allSensitiveFields = [...defaultSensitiveFields, ...sensitiveFields];
    const sanitized = { ...data };

    for (const field of allSensitiveFields) {
        if (sanitized[field] !== undefined) {
            sanitized[field] = '[REDACTED]';
        }
    }

    return sanitized;
}

// Predefined action types for consistency
export const ACTION_TYPES = {
    AUTH: {
        LOGIN: 'LOGIN',
        LOGOUT: 'LOGOUT',
        PASSWORD_CHANGE: 'PASSWORD_CHANGE',
        FAILED_LOGIN: 'FAILED_LOGIN',
        ACCOUNT_LOCKED: 'ACCOUNT_LOCKED',
        SESSION_EXPIRED: 'SESSION_EXPIRED'
    },
    REGISTRATION: {
        CREATE: 'CREATE',
        UPDATE: 'UPDATE',
        DELETE: 'DELETE',
        APPROVE: 'APPROVE',
        REJECT: 'REJECT',
        STATUS_CHANGE: 'STATUS_CHANGE'
    },
    ACADEMIC: {
        TERM_CREATE: 'TERM_CREATE',
        TERM_UPDATE: 'TERM_UPDATE',
        TERM_DELETE: 'TERM_DELETE',
        TERM_STATUS_CHANGE: 'TERM_STATUS_CHANGE',
        YEAR_LEVEL_CREATE: 'YEAR_LEVEL_CREATE',
        YEAR_LEVEL_UPDATE: 'YEAR_LEVEL_UPDATE',
        YEAR_LEVEL_DELETE: 'YEAR_LEVEL_DELETE'
    },
    USER: {
        CREATE: 'CREATE',
        UPDATE: 'UPDATE',
        DELETE: 'DELETE',
        ROLE_CHANGE: 'ROLE_CHANGE',
        PERMISSION_CHANGE: 'PERMISSION_CHANGE'
    },
    SYSTEM: {
        BACKUP: 'BACKUP',
        RESTORE: 'RESTORE',
        MAINTENANCE: 'MAINTENANCE',
        CONFIG_CHANGE: 'CONFIG_CHANGE',
        MIGRATION: 'MIGRATION'
    }
} as const;
