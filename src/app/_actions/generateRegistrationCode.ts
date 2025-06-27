'use server'

import { prisma } from '@/lib/prisma'

/**
 * Generates a unique registration code in the format REG-XXXXXXXX
 * The code consists of:
 * - REG prefix for registration
 * - 8 character alphanumeric suffix (excluding confusing characters like 0, O, I, l)
 */
async function generateUniqueCode(): Promise<string> {
    const characters = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Excluded: 0, O, I, 1
    const codeLength = 8;
    let attempts = 0;
    const maxAttempts = 10;

    while (attempts < maxAttempts) {
        let code = 'REG-';

        // Generate random 8-character suffix
        for (let i = 0; i < codeLength; i++) {
            code += characters.charAt(Math.floor(Math.random() * characters.length));
        }

        // Check if code already exists in database
        const existingCode = await prisma.registrationCode.findUnique({
            where: { registrationCode: code },
            select: { id: true }
        });

        if (!existingCode) {
            return code;
        }

        attempts++;
    }

    const now = new Date();
    const timestamp = new Date(now.getTime() + 8 * 60 * 60 * 1000);
    const randomSuffix = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `REG-${timestamp}${randomSuffix}`;
}

export async function generateRegistrationCode(): Promise<{
    success: boolean;
    code?: string;
    error?: string;
}> {
    try {
        const code = await generateUniqueCode();

        // Convert to UTC+8 (Philippine local time)
        const now = new Date();
        const phTime = new Date(now.getTime() + 8 * 60 * 60 * 1000);

        // 1 hour expiration from PH time
        const expirationDate = new Date(phTime.getTime() + 60 * 60 * 1000);

        console.log(`Generated registration code: ${code} at ${phTime.toISOString()}`);

        await prisma.registrationCode.create({
            data: {
                registrationCode: code,
                status: 'active',
                expirationDate: expirationDate,
                createdAt: phTime
            }
        });

        return {
            success: true,
            code: code
        };
    } catch (error) {
        console.error('Error generating registration code:', error);
        return {
            success: false,
            error: 'Failed to generate registration code'
        };
    }
}

/**
 * Validates if a registration code exists and is valid
 */
export async function validateRegistrationCode(code: string): Promise<{
    success: boolean;
    isValid?: boolean;
    registrationId?: number;
    error?: string;
}> {
    try {
        if (!code || !code.startsWith('REG-')) {
            return {
                success: true,
                isValid: false
            };
        }

        const registration = await prisma.registrationCode.findUnique({
            where: { registrationCode: code },
            select: {
                id: true,
                status: true,
                expirationDate:true,
                createdAt: true
            }
        });

        // check if code is active, not expired
        if (
            registration?.status !== 'active' ||
            !registration?.expirationDate ||
            registration.expirationDate < new Date()
        ) {
            return {
                success: true,
                isValid: false
            };
        }

        return {
            success: true,
            isValid: true,
            registrationId: registration.id
        };
    } catch (error) {
        console.error('Error validating registration code:', error);
        return {
            success: false,
            error: 'Failed to validate registration code'
        };
    }
}

export async function generateRegistrationCodeForRegistration(registrationId: number): Promise<{
    success: boolean;
    code?: string;
    registrationCodeId?: number;
    error?: string;
}> {
    try {
        const code = await generateUniqueCode();

        // Convert to UTC+8 (Philippine local time)
        const now = new Date();
        const phTime = new Date(now.getTime() + 8 * 60 * 60 * 1000);

        // 1 hour expiration from PH time
        const expirationDate = new Date(phTime.getTime() + 60 * 60 * 1000);

        console.log(`Generated registration code: ${code} at ${phTime.toISOString()} for registrationId: ${registrationId}`);

        // Use a transaction to ensure both code creation and status update
        const result = await prisma.$transaction(async (tx) => {
            const created = await tx.registrationCode.create({
                data: {
                    registrationCode: code,
                    status: 'active',
                    expirationDate: expirationDate,
                    createdAt: phTime,
                    registrationId: registrationId
                }
            });
            await tx.registration.update({
                where: { id: registrationId },
                data: { status: 'approved', updatedAt: phTime }
            });
            return created;
        });

        return {
            success: true,
            code: code,
            registrationCodeId: result.id
        };
    } catch (error) {
        console.error('Error generating registration code for registration:', error);
        return {
            success: false,
            error: 'Failed to generate registration code for registration'
        };
    }
}
