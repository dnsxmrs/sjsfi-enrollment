"use server";

import { prisma } from "@/lib/prisma";

export async function getGeneralPolicy() {
    try {
        const policy = await prisma.generalPolicy.findFirst({
            where: {
                deletedAt: null
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        return {
            success: true,
            policy,
            message: 'General policy fetched successfully'
        };
    } catch (error) {
        console.error('Error fetching general policy:', error);

        return {
            success: false,
            policy: null,
            error: error instanceof Error ? error.message : 'Failed to fetch general policy'
        };
    }
}

export async function saveGeneralPolicy(content: string) {
    try {
        if (!content.trim()) {
            return {
                success: false,
                error: 'Content is required'
            };
        }

        // Check if there's an existing policy
        const existingPolicy = await prisma.generalPolicy.findFirst({
            where: {
                deletedAt: null
            }
        });

        // Convert to UTC+8 (Philippine local time)
        const now = new Date();
        const phTime = new Date(now.getTime() + 8 * 60 * 60 * 1000);

        let policy;
        if (existingPolicy) {
            // Update existing policy
            policy = await prisma.generalPolicy.update({
                where: { id: existingPolicy.id },
                data: {
                    content: content.trim(),
                    updatedAt: phTime
                }
            });
        } else {
            // Create new policy
            policy = await prisma.generalPolicy.create({
                data: {
                    title: 'General Policy and Guidelines',
                    content: content.trim(),
                    createdAt: phTime,
                    updatedAt: phTime
                }
            });
        }

        return {
            success: true,
            policy,
            message: 'General policy saved successfully'
        };
    } catch (error) {
        console.error('Error saving general policy:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Failed to save general policy'
        };
    }
}
