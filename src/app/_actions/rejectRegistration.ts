'use server'

import { prisma } from '@/lib/prisma';

export async function rejectRegistration(registrationId: number): Promise<{
    success: boolean;
    code?: string;
    error?: string;
}> {
    try {
        if (!registrationId || isNaN(registrationId)) {
            return { success: false, error: 'Invalid registration ID' };
        }

        // Check if registration exists
        const registration = await prisma.registration.findUnique({
            where: { id: registrationId },
            select: {
                id: true,
                status: true,
                studentApplicationId: true,
                firstName: true,
                familyName: true
            }
        });

        if (!registration) {
            return { success: false, error: 'Registration not found' };
        }

        if (registration.status === 'APPROVED') {
            return { success: false, error: 'Registration is already approved' };
        }

        // Convert to UTC+8 (Philippine local time)
        const now = new Date();
        const phTime = new Date(now.getTime() + 8 * 60 * 60 * 1000);

        // Start transaction to update registration status and create code
        await prisma.$transaction(async (tx) => {
            // Update registration status to APPROVED
            await tx.registration.update({
                where: { id: registrationId },
                data: {
                    status: 'REJECTED',
                    updatedAt: phTime
                }
            });
        });

        console.log(`Registration ${registrationId} for ${registration.firstName} ${registration.familyName}`);

        return {
            success: true,
        };

    } catch (error) {
        console.error('Error approving registration:', error);
        return { success: false, error: 'Failed to approve registration' };
    }
};
