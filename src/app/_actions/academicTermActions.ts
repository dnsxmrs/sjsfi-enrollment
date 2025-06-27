"use server";

import { prisma } from "@/lib/prisma";

export async function addAcademicTerm(data: {
    year: string;
    startDate: Date;
    endDate: Date;
    status?: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED' | 'ARCHIVED';
}) {
    try {
        // Validate input
        if (!data.year || !data.startDate || !data.endDate) {
            return {
                success: false,
                error: 'Academic term year, start date, and end date are required'
            };
        }

        // Validate dates
        if (data.startDate >= data.endDate) {
            return {
                success: false,
                error: 'Start date must be before end date'
            };
        }

        // Check if academic term with the same year already exists
        const existingTerm = await prisma.academicTerm.findFirst({
            where: {
                year: data.year,
                deletedAt: null
            }
        });

        if (existingTerm) {
            return {
                success: false,
                error: 'An academic term with this year already exists'
            };
        }

        // Check for overlapping terms
        const overlappingTerm = await prisma.academicTerm.findFirst({
            where: {
                deletedAt: null,
                OR: [
                    {
                        // New term starts during an existing term
                        AND: [
                            { startDate: { lte: data.startDate } },
                            { endDate: { gte: data.startDate } }
                        ]
                    },
                    {
                        // New term ends during an existing term
                        AND: [
                            { startDate: { lte: data.endDate } },
                            { endDate: { gte: data.endDate } }
                        ]
                    },
                    {
                        // New term completely encompasses an existing term
                        AND: [
                            { startDate: { gte: data.startDate } },
                            { endDate: { lte: data.endDate } }
                        ]
                    }
                ]
            }
        });

        if (overlappingTerm) {
            return {
                success: false,
                error: `Date range overlaps with existing academic term: ${overlappingTerm.year}`
            };
        }

        // Create the new academic term
        const newTerm = await prisma.academicTerm.create({
            data: {
                year: data.year,
                startDate: data.startDate,
                endDate: data.endDate,
                status: data.status || 'ACTIVE'
            }
        });

        return {
            success: true,
            academicTerm: newTerm,
            message: 'Academic term added successfully'
        };
    } catch (error) {
        console.error('Error adding academic term:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Failed to add academic term'
        };
    }
}

export async function updateAcademicTerm(id: number, data: {
    year?: string;
    startDate?: Date;
    endDate?: Date;
    status?: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED' | 'ARCHIVED';
}) {
    try {
        // Check if academic term exists
        const existingTerm = await prisma.academicTerm.findFirst({
            where: {
                id,
                deletedAt: null
            }
        });

        if (!existingTerm) {
            return {
                success: false,
                error: 'Academic term not found'
            };
        }

        // If updating dates, validate them
        const startDate = data.startDate || existingTerm.startDate;
        const endDate = data.endDate || existingTerm.endDate;

        if (startDate >= endDate) {
            return {
                success: false,
                error: 'Start date must be before end date'
            };
        }

        // Update the academic term
        const updatedTerm = await prisma.academicTerm.update({
            where: { id },
            data: {
                ...(data.year && { year: data.year }),
                ...(data.startDate && { startDate: data.startDate }),
                ...(data.endDate && { endDate: data.endDate }),
                ...(data.status && { status: data.status }),
                updatedAt: new Date()
            }
        });

        return {
            success: true,
            academicTerm: updatedTerm,
            message: 'Academic term updated successfully'
        };
    } catch (error) {
        console.error('Error updating academic term:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Failed to update academic term'
        };
    }
}

export async function deleteAcademicTerm(id: number) {
    try {
        // Check if academic term exists
        const existingTerm = await prisma.academicTerm.findFirst({
            where: {
                id,
                deletedAt: null
            }
        });

        if (!existingTerm) {
            return {
                success: false,
                error: 'Academic term not found'
            };
        }

        // Check if there are registrations associated with this term
        const registrations = await prisma.registration.findFirst({
            where: {
                schoolYearRef: id,
                deletedAt: null
            }
        });

        if (registrations) {
            return {
                success: false,
                error: 'Cannot delete academic term that has associated student registrations'
            };
        }

        // Soft delete the academic term
        await prisma.academicTerm.update({
            where: { id },
            data: {
                deletedAt: new Date(),
                updatedAt: new Date()
            }
        });

        return {
            success: true,
            message: 'Academic term deleted successfully'
        };
    } catch (error) {
        console.error('Error deleting academic term:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Failed to delete academic term'
        };
    }
}
