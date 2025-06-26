'use client'

import React from 'react';
import { useRouter } from 'next/navigation';

export default function StudentApplicationNextPage() {
  const router = useRouter();

  return (
    <div className="bg-gray-100 p-6 flex flex-col">
      {/* Header */}
      <div className="flex justify-between bg-gray-100 py-2 rounded mb-6">
        <button
          type="button"
          className="bg-red-800 text-white px-4 py-2 rounded-md"
          onClick={() => {
            // Go back to previous page
            router.back();
          }}
        >
          Back
        </button>
        <h1 className="w-full bg-white rounded-md py-2 px-6 font-bold text-black text-lg tracking-widest text-center flex-grow ml-3">
          STUDENT APPLICATION FORM
        </h1>
      </div>

      {/* Content Box */}
      <div className="bg-white rounded-md shadow p-8 space-y-6">
        {/* Academic Year and Admission */}
        <div className="flex justify-between space-x-4">
          <div className="flex flex-col flex-grow">
            <label className="text-xs font-semibold mb-1">Academic Year:</label>
            <input
              type="text"
              placeholder="Answer Here..."
              className="border border-gray-300 rounded px-2 py-1"
            />
          </div>
          <div className="flex flex-col flex-grow">
            <label className="text-xs font-semibold mb-1">Admission to Grade / Year:</label>
            <input
              type="text"
              placeholder="Answer Here..."
              className="border border-gray-300 rounded px-2 py-1"
            />
          </div>
        </div>

        {/* Personal Data Header */}
        <div className="text-center font-bold border border-gray-300 rounded py-1 tracking-widest">
          PERSONAL DATA
        </div>

        {/* Personal Data Fields */}
        <div className="grid grid-cols-4 gap-4">
          <div className="flex flex-col">
            <label className="text-xs font-semibold mb-1">Family Name:</label>
            <input type="text" placeholder="Answer Here..." className="border border-gray-300 rounded px-2 py-1" />
          </div>
          <div className="flex flex-col">
            <label className="text-xs font-semibold mb-1">First Name:</label>
            <input type="text" placeholder="Answer Here..." className="border border-gray-300 rounded px-2 py-1" />
          </div>
          <div className="flex flex-col">
            <label className="text-xs font-semibold mb-1">Middle Name:</label>
            <input type="text" placeholder="Answer Here..." className="border border-gray-300 rounded px-2 py-1" />
          </div>
          <div className="flex flex-col">
            <label className="text-xs font-semibold mb-1">Nickname:</label>
            <input type="text" placeholder="Answer Here..." className="border border-gray-300 rounded px-2 py-1" />
          </div>
        </div>

        {/* Birth Date and Place */}
        <div className="grid grid-cols-6 gap-4 items-center">
          <div className="flex flex-col col-span-1">
            <label className="text-xs font-semibold mb-1">Birth Date:</label>
            <input type="date" className="border border-gray-300 rounded px-2 py-1" />
          </div>
          <div className="flex flex-col col-span-2">
            <label className="text-xs font-semibold mb-1">Place of Birth:</label>
            <input type="text" placeholder="Answer Here..." className="border border-gray-300 rounded px-2 py-1" />
          </div>
          <div className="flex flex-col col-span-1">
            <label className="text-xs font-semibold mb-1">Age:</label>
            <input type="number" placeholder="Answer Here..." className="border border-gray-300 rounded px-2 py-1" />
          </div>
          <div className="flex flex-col col-span-1">
            <label className="text-xs font-semibold mb-1">Birth Order:</label>
            <input type="number" placeholder="Answer Here..." className="border border-gray-300 rounded px-2 py-1" />
          </div>
          <div className="flex flex-col col-span-1">
            <label className="text-xs font-semibold mb-1">Number of Siblings:</label>
            <input type="number" placeholder="Answer Here..." className="border border-gray-300 rounded px-2 py-1" />
          </div>
        </div>

        {/* Gender Radio Buttons */}
        <div className="flex space-x-6 items-center">
          <label className="inline-flex items-center space-x-2">
            <input type="radio" name="gender" value="female" />
            <span>Female</span>
          </label>
          <label className="inline-flex items-center space-x-2">
            <input type="radio" name="gender" value="male" />
            <span>Male</span>
          </label>
        </div>

        {/* Nationality, Religion, Height, Weight, Blood Type */}
        <div className="grid grid-cols-6 gap-4">
          <div className="flex flex-col col-span-2">
            <label className="text-xs font-semibold mb-1">Nationality:</label>
            <input type="text" placeholder="Answer Here..." className="border border-gray-300 rounded px-2 py-1" />
          </div>
          <div className="flex flex-col col-span-2">
            <label className="text-xs font-semibold mb-1">Religion:</label>
            <input type="text" placeholder="Answer Here..." className="border border-gray-300 rounded px-2 py-1" />
          </div>
          <div className="flex flex-col col-span-1">
            <label className="text-xs font-semibold mb-1">Height:</label>
            <input type="text" placeholder="Answer Here..." className="border border-gray-300 rounded px-2 py-1" />
          </div>
          <div className="flex flex-col col-span-1">
            <label className="text-xs font-semibold mb-1">Weight:</label>
            <input type="text" placeholder="Answer Here..." className="border border-gray-300 rounded px-2 py-1" />
          </div>
          <div className="flex flex-col col-span-1">
            <label className="text-xs font-semibold mb-1">Blood Type:</label>
            <input type="text" placeholder="Answer Here..." className="border border-gray-300 rounded px-2 py-1" />
          </div>
        </div>

        {/* Languages / Dialect */}
        <div className="flex flex-col">
          <label className="text-xs font-semibold mb-1">Languages/ Dialect spoken at home:</label>
          <input type="text" placeholder="Answer Here..." className="border border-gray-300 rounded px-2 py-1" />
        </div>

        {/* Landline, Mobile, Email */}
        <div className="grid grid-cols-3 gap-4">
          <div className="flex flex-col">
            <label className="text-xs font-semibold mb-1">Landline Number:</label>
            <input type="text" placeholder="Answer Here..." className="border border-gray-300 rounded px-2 py-1" />
          </div>
          <div className="flex flex-col">
            <label className="text-xs font-semibold mb-1">Mobile Number:</label>
            <input type="text" placeholder="Answer Here..." className="border border-gray-300 rounded px-2 py-1" />
          </div>
          <div className="flex flex-col">
            <label className="text-xs font-semibold mb-1">E-mail Address:</label>
            <input type="email" placeholder="Answer Here..." className="border border-gray-300 rounded px-2 py-1" />
          </div>
        </div>

        {/* Home Address */}
        <div className="grid grid-cols-6 gap-4">
          <div className="flex flex-col col-span-3">
            <label className="text-xs font-semibold mb-1">Home Address:</label>
            <input type="text" placeholder="Answer Here..." className="border border-gray-300 rounded px-2 py-1" />
          </div>
          <div className="flex flex-col col-span-1">
            <label className="text-xs font-semibold mb-1">City:</label>
            <select className="border border-gray-300 rounded px-2 py-1">
              <option>Answer Here...</option>
            </select>
          </div>
          <div className="flex flex-col col-span-1">
            <label className="text-xs font-semibold mb-1">State/ Province:</label>
            <select className="border border-gray-300 rounded px-2 py-1">
              <option>Answer Here...</option>
            </select>
          </div>
          <div className="flex flex-col col-span-1">
            <label className="text-xs font-semibold mb-1">Zip/ Postal Code:</label>
            <input type="text" placeholder="Answer Here..." className="border border-gray-300 rounded px-2 py-1" />
          </div>
        </div>

        {/* Provincial Address */}
        <div className="grid grid-cols-6 gap-4">
          <div className="flex flex-col col-span-3">
            <label className="text-xs font-semibold mb-1">Provincial Address:</label>
            <input type="text" placeholder="Answer Here..." className="border border-gray-300 rounded px-2 py-1" />
          </div>
          <div className="flex flex-col col-span-1">
            <label className="text-xs font-semibold mb-1">City:</label>
            <select className="border border-gray-300 rounded px-2 py-1">
              <option>Answer Here...</option>
            </select>
          </div>
          <div className="flex flex-col col-span-1">
            <label className="text-xs font-semibold mb-1">State/ Province:</label>
            <select className="border border-gray-300 rounded px-2 py-1">
              <option>Answer Here...</option>
            </select>
          </div>
          <div className="flex flex-col col-span-1">
            <label className="text-xs font-semibold mb-1">Zip/ Postal Code:</label>
            <input type="text" placeholder="Answer Here..." className="border border-gray-300 rounded px-2 py-1" />
          </div>
        </div>

        {/* Talents/ Special Skills and Hobbies */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="text-xs font-semibold mb-1">Talents/ Special Skills:</label>
            <input
              type="text"
              placeholder="Answer Here..."
              maxLength={150}
              className="border border-gray-300 rounded px-2 py-1"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-xs font-semibold mb-1">Hobbies and Interests:</label>
            <input
              type="text"
              placeholder="Answer Here..."
              maxLength={150}
              className="border border-gray-300 rounded px-2 py-1"
            />
          </div>
        </div>
      </div>

      {/* Footer with Next Page button */}
      <div className="mt-6 flex justify-end">
        <button
          type="button"
          className="bg-red-800 text-white px-6 py-2 rounded-md hover:bg-red-900 cursor-pointer"
          onClick={() => {
            // TODO: Implement navigation to the next page
            // For now, just alert
            alert('Next Page clicked');
          }}
        >
          Next Page
        </button>
      </div>
    </div>
  );
}
