'use client'

import React from 'react';
import { useRouter } from 'next/navigation';

const HomePage: React.FC = () => {
  const router = useRouter();

  const handleStudentRegistrationClick = () => {
    router.push('/forms/student-registration');
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 p-4 text-black m-50">
      <h1 className="text-3xl font-bold mb-6">Welcome to the Forms Selection Screen</h1>
      <div className="flex space-x-4">
        <button
          onClick={handleStudentRegistrationClick}
          className="bg-red-800 text-white px-6 py-3 rounded hover:bg-red-900 transition"
        >
          Student Registration
        </button>

        <button className="bg-red-800 text-white px-6 py-3 rounded hover:bg-red-900 transition">
          Student Application
        </button>
      </div>
    </div>
  );
};

export default HomePage;
