"use server";

import { prisma } from "@/lib/prisma";

const now = new Date();
const phTime = new Date(now.getTime() + 8 * 60 * 60 * 1000);

export async function addYearLevel(name: string) {
    try {
        if (!name.trim()) {
            return {
                success: false,
                error: 'Year level name is required'
            };
        }

        // Check if year level already exists
        const existingYearLevel = await prisma.yearLevel.findFirst({
            where: {
                name: name.trim(),
                deletedAt: null
            }
        });

        if (existingYearLevel) {
            return {
                success: false,
                error: 'Year level already exists'
            };
        }

        const yearLevel = await prisma.yearLevel.create({
            data: {
                name: name.trim(),
                createdAt: phTime,
                updatedAt: phTime
            }
        });

        return {
            success: true,
            yearLevel,
            message: 'Year level added successfully'
        };
    } catch (error) {
        console.error('Error adding year level:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Failed to add year level'
        };
    }
}

export async function updateYearLevel(id: number, name: string) {
    try {
        if (!name.trim()) {
            return {
                success: false,
                error: 'Year level name is required'
            };
        }

        // Check if another year level with the same name exists
        const existingYearLevel = await prisma.yearLevel.findFirst({
            where: {
                name: name.trim(),
                deletedAt: null,
                NOT: { id }
            }
        });

        if (existingYearLevel) {
            return {
                success: false,
                error: 'Year level name already exists'
            };
        }

        const yearLevel = await prisma.yearLevel.update({
            where: { id },
            data: {
                name: name.trim(),
                updatedAt: phTime
            }
        });

        return {
            success: true,
            yearLevel,
            message: 'Year level updated successfully'
        };
    } catch (error) {
        console.error('Error updating year level:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Failed to update year level'
        };
    }
}

export async function deleteYearLevel(id: number) {
    try {
        // Soft delete the year level
        const yearLevel = await prisma.yearLevel.update({
            where: { id },
            data: {
                deletedAt: phTime
            }
        });

        return {
            success: true,
            yearLevel,
            message: 'Year level deleted successfully'
        };
    } catch (error) {
        console.error('Error deleting year level:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Failed to delete year level'
        };
    }
}
