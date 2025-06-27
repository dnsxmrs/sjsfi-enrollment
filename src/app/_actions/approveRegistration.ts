'use server'

import { prisma } from '@/lib/prisma';
import { generateUniqueApplicationCode } from '@/app/_actions/generateCode';
import { logRegistrationEvent } from '@/lib/systemLoggerHelpers';

export async function approveRegistration(registrationId: number): Promise<{
    success: boolean;
    code?: string;
    error?: string;
}> {
    try {
        if (!registrationId || isNaN(registrationId)) {
            await logRegistrationEvent({
                actionType: 'UPDATE',
                actionSubType: 'APPROVE',
                registrationId: registrationId?.toString() || 'invalid',
                success: false,
                errorMessage: 'Invalid registration ID',
                userName: 'System', // TODO: Get actual user
                userRole: 'REGISTRAR'
            });

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
            await logRegistrationEvent({
                actionType: 'UPDATE',
                actionSubType: 'APPROVE',
                registrationId: registrationId.toString(),
                success: false,
                errorMessage: 'Registration not found',
                userName: 'System', // TODO: Get actual user
                userRole: 'REGISTRAR'
            });

            return { success: false, error: 'Registration not found' };
        }

        if (registration.status === 'APPROVED') {
            await logRegistrationEvent({
                actionType: 'UPDATE',
                actionSubType: 'APPROVE',
                registrationId: registrationId.toString(),
                studentName: `${registration.firstName} ${registration.familyName}`,
                success: false,
                errorMessage: 'Registration already approved',
                userName: 'System', // TODO: Get actual user
                userRole: 'REGISTRAR'
            });

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

        // Log successful approval
        await logRegistrationEvent({
            actionType: 'UPDATE',
            actionSubType: 'APPROVE',
            registrationId: registrationId.toString(),
            studentName: `${registration.firstName} ${registration.familyName}`,
            oldValues: { status: registration.status },
            newValues: {
                status: 'APPROVED',
                registrationCode: code,
                expirationDate: expirationDate.toISOString()
            },
            success: true,
            userName: 'System', // TODO: Get actual user
            userRole: 'REGISTRAR'
        });

        return {
            success: true,
            code: code
        };
    } catch (error) {
        console.error('Error approving registration:', error);

        // Log failed approval
        await logRegistrationEvent({
            actionType: 'UPDATE',
            actionSubType: 'APPROVE',
            registrationId: registrationId.toString(),
            success: false,
            errorMessage: error instanceof Error ? error.message : 'Unknown error',
            userName: 'System', // TODO: Get actual user
            userRole: 'REGISTRAR'
        });

        return { success: false, error: 'Failed to approve registration' };
    }
};
