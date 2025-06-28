"use server";

import { prisma } from "@/lib/prisma";

interface SystemLog {
    logNumber: string;
    timestamp: string;
    user: string;
    action: string;
    status: string;
    role: string;
    actionCategory?: string;
    targetType?: string;
    severityLevel?: string;
}

export async function getSystemLogs(): Promise<{
    success: boolean;
    logs?: SystemLog[];
    error?: string;
}> {
    try {
        console.log("Fetching system logs...");

        // Fetch system logs from the database
        const systemLogs = await prisma.systemLog.findMany({
            orderBy: {
                createdAt: 'desc'
            },
            take: 100, // Limit to latest 100 logs
        });

        // Transform the data to match the expected format
        const formattedLogs: SystemLog[] = systemLogs.map((log) => ({
            logNumber: log.logNumber,
            timestamp: log.timestamp.toLocaleString('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false
            }),
            user: log.userName || 'System',
            action: log.actionDescription,
            status: log.status === 'SUCCESS' ? 'Success' : log.status === 'FAILED' ? 'Failed' : 'Warning',
            role: log.userRole || 'System',
            actionCategory: log.actionCategory,
            targetType: log.targetType,
            severityLevel: log.severityLevel
        }));

        console.log(`Fetched ${formattedLogs.length} system logs successfully`);

        return {
            success: true,
            logs: formattedLogs
        };

    } catch (error) {
        console.error("Error fetching system logs:", error);

        return {
            success: false,
            error: error instanceof Error ? error.message : "Failed to fetch system logs"
        };
    }
}
