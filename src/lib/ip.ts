import { headers } from 'next/headers';

export async function getClientIp() {
    const headersList = await headers();

    const ip =
        headersList.get('x-forwarded-for')?.split(',')[0].trim() ||
        headersList.get('x-real-ip') ||
        '127.0.0.1'; // Default to localhost if no IP is found

    return ip;
}