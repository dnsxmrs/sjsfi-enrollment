'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function StudentApplicationForm() {
  const [confirmed, setConfirmed] = useState(false);
  const router = useRouter();

  return (
    <div className="bg-gray-100 p-6 flex flex-col">
      {/* Header */}
      <div className="flex justify-between bg-gray-100 py-2 rounded mb-6">
        <button
          type="button"
          className="bg-red-800 text-white px-4 py-2 rounded-md"
          onClick={() => {
            // Handle cancel action, e.g., navigate back
            router.back();
          }}
        >
          Cancel
        </button>
        <h1 className="w-full bg-white rounded-md py-2 px-6 font-bold text-black text-lg tracking-widest text-center flex-grow ml-3">
          STUDENT APPLICATION FORM
        </h1>
      </div>

      {/* Content Box */}
      <div className="bg-white rounded-md shadow p-8">
        <p className="font-bold mb-6 text-black">
          Before continuing with the student application, please ensure you have the following:
        </p>
        <ol className="list-decimal list-inside space-y-3 text-sm text-black max-w-3xl">
          <li>Preliminary interview upon application</li>
          <li>Copy of Grades and Transcript Records (if available) for evaluation only;</li>
          <li>
            One (1) copy of recent 2” x 2” ID picture (Please write your name and grade/year at the back of the photo)
          </li>
          <li>Php 300.00 testing fee (non-refundable)</li>
        </ol>

        <label className="mt-8 flex items-start space-x-2 text-red-800 text-sm max-w-3xl cursor-pointer">
          <input
            type="checkbox"
            checked={confirmed}
            onChange={() => setConfirmed(!confirmed)}
            className="mt-1"
          />
          <span>
            I hereby confirm that I have completed all the required tasks and have all the necessary items.
          </span>
        </label>
      </div>

      
      {/* Footer with Continue button */}
      <div className="mt-6 flex justify-end">
        <button
          type="button"
          disabled={!confirmed}
          className={`bg-red-800 text-white px-6 py-2 rounded-md ${
            confirmed ? 'hover:bg-red-900 cursor-pointer' : 'opacity-50 cursor-not-allowed'
          }`}
          onClick={() => {
            // Navigate to the new page
            router.push('/auth/forms/student-application/personal-info');
          }}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
