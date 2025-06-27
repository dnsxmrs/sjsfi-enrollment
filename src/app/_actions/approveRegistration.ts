'use server'

import { prisma } from '@/lib/prisma';
import { generateUniqueApplicationCode } from '@/app/_actions/generateCode';

export async function approveRegistration(registrationId: number): Promise<{
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

        // Generate application code
        const code = await generateUniqueApplicationCode();

        // Convert to UTC+8 (Philippine local time)
        const now = new Date();
        const phTime = new Date(now.getTime() + 8 * 60 * 60 * 1000);

        // 24 hours expiration from PH time
        const expirationDate = new Date(phTime.getTime() + 24 * 60 * 60 * 1000);

        // Start transaction to update registration status and create code
        await prisma.$transaction(async (tx) => {
            // Update registration status to APPROVED
            await tx.registration.update({
                where: { id: registrationId },
                data: {
                    status: 'APPROVED',
                    updatedAt: phTime
                }
            });

            // Create registration code
            await tx.registrationCode.create({
                data: {
                    registrationCode: code,
                    status: 'ACTIVE',
                    expirationDate: expirationDate,
                    registrationId: registrationId,
                    applicationId: registration.studentApplicationId,
                    createdAt: phTime
                }
            });
        });

        console.log(`Registration ${registrationId} for ${registration.firstName} ${registration.familyName} approved with code: ${code}`);

        return {
            success: true,
            code: code
        };

    } catch (error) {
        console.error('Error approving registration:', error);
        return { success: false, error: 'Failed to approve registration' };
    }
};
