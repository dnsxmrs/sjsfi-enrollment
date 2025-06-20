import { sha256 } from 'js-sha256';

/**
 * Generates a 256-bit salt (64-character hex string).
 */
export function generateSalt(): string {
    const charset = 'abcdef0123456789';
    let salt = '';
    for (let i = 0; i < 64; i++) {
        salt += charset[Math.floor(Math.random() * charset.length)];
    }
    return salt;
}

/**
 * Hash a value using SHA-256 with the provided or generated salt.
 */
export function hashWithSHA256(value: string, salt?: string): { saltHash: string;} {
    const finalSalt = salt || generateSalt();
    const hash = sha256(value + finalSalt);
    return { saltHash: finalSalt + ":" + hash };
}