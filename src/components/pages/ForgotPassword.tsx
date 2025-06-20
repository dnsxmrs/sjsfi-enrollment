'use client';

import Image from 'next/image';
import { useState } from 'react';
import InputField from '@/components/atoms/InputField';
import LoginFooter from '@/components/atoms/LoginFooter';
import Link from 'next/link';
import ActionButton from '@/components/atoms/ActionButton';

export default function ForgotPassword() {
    const [email, setEmail] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // TODO: handle form submission
    };

    return (
        <div className="flex h-screen w-screen bg-white min-w-[360px]">
            <div className="container">
                {/* Main Screen - BG IMAGE */}
                <div
                    style={{ backgroundImage: "url('/assets/sis_bg.webp')" }}
                    className=" h-screen w-screen bg-cover bg-center"
                >
                    {/* LOGIN FORM BG */}
                    <div className="absolute right-0 w-full md:w-1/3 min-h-screen min-w-[360px] pt-[10vh] overflow-hidden bg-white/70 backdrop-blur-[20px] backdrop-saturate-[168%] shadow-md m-0 rounded-none flex flex-col bg-clip-border border border-transparent break-words mb-4">

                        {/* WRAPPER */}
                        <div className="flex flex-col items-center h-full w-full">

                            {/* HEADER */}
                            <div className="flex flex-col items-center justify-center w-full mb-4">
                                <Image
                                    src="/assets/sjsfi_logo.svg"
                                    alt="SJSFI Logo"
                                    width={90}
                                    height={90}
                                    className="mb-2"
                                />
                                <h1 className="text-3xl text-center text-[#800000] w-full">
                                    <span className='font-bold'>SJSFI-SIS </span>Forgot Password
                                </h1>
                            </div>

                            {/* BODY */}
                            <div className="flex flex-col items-center justify-center w-full">
                                <p className='text-center text-black text-sm mb-4'>
                                    Can&apos;t remember your password? You can request a password reset below.
                                </p>

                                {/* FORM */}
                                <form className="w-full px-4" autoComplete="off" onSubmit={handleSubmit}>
                                    <div className="mb-4 w-full">
                                        <InputField
                                            name="email"
                                            type="email"
                                            placeholder="Email Address"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                    <div className="mb-4 w-full">
                                        <ActionButton label='Send Reset Link' />
                                    </div>
                                    <div className="mb-4 w-full">
                                        <Link href="/" className="w-full inline-block">
                                            <span
                                                className="bg-[#fff] text-[#800000] text-sm rounded-sm px-4 py-2 w-full block text-center hover:bg-[#fff]/80 transition duration-200 ease-in-out"
                                            >
                                                Back to Login
                                            </span>
                                        </Link>
                                    </div>
                                    <LoginFooter />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}