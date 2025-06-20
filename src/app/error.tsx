'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
    const router = useRouter();

    useEffect(() => {
        // console.error('Error caught by error.tsx:', error);
    }, [error]);

    return (
        <div className="flex flex-col items-center justify-center h-screen w-screen bg-white text-center px-4">
            {/* Logo */}
            <Image
                src="/assets/sjsfi_logo.svg"
                alt="SJSFI Logo"
                width={90}
                height={90}
                className="mb-4"
            />

            {/* Header */}
            <h1 className="text-3xl font-bold text-[#800000] mb-2">
                Something went wrong
            </h1>

            {/* Optional error message */}
            <p className="text-sm text-black mb-6">
                We&apos;re sorry for the inconvenience. Please try again or go back home.
            </p>
            {/* Optional error message */}
            <p className="text-sm font-medium text-black mb-6">
                See error: <span className='text-[#800000]'>{error.message}</span>
            </p>

            {/* Action Buttons */}
            <div className="flex gap-3">
                <button
                    onClick={reset}
                    className="bg-[#DAA520] text-white hover:bg-[#b8860b] transition-colors px-4 py-2 rounded-md font-medium"
                >
                    Try Again
                </button>
                <button
                    onClick={() => router.push('/')}
                    className="bg-[#800000] text-white hover:bg-[#a00000] transition-colors px-4 py-2 rounded-md font-medium"
                >
                    Go Home
                </button>
            </div>
        </div>
    );
}
