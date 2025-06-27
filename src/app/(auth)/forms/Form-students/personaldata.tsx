import React from "react";

interface StudentPersonalDataPageProps {
  onBack?: () => void;
  onNext?: () => void;
}

export default function StudentPersonalDataPage({ onBack, onNext }: StudentPersonalDataPageProps) {
  return (
    <div className="bg-gray-100 p-6 flex flex-col">
    <div className="w-full flex flex-col items-center py-8">
      {/* Header */}
      <div className="w-full flex flex-col items-center mb-6">
        <div className="w-full flex items-center gap-4 mt-2">
          <button
            className="bg-[#a10000] text-white px-8 py-2 rounded-md font-semibold text-md shadow hover:bg-[#7a0000] transition"
            onClick={onBack}
          >
            Back
          </button>
          <div className="flex-1 flex justify-center">
            <h1 className="w-full bg-white rounded-md py-2 px-6 font-bold text-black text-lg tracking-widest text-center flex-grow ml-3 shadow">
              STUDENT APPLICATION FORM
            </h1>
          </div>
        </div>
      </div>

      {/* Content Box */}
      <div className="bg-white rounded-md shadow p-8 space-y-6 text-black">
        {/* Personal Data Header */}
        <div className="font-bold text-lg tracking-wide py-2 text-white bg-[#a10000] rounded w-full text-center">
          PERSONAL DATA
        </div>
        
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
        <div className="grid grid-cols-7 gap-4 items-center">
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

          {/* Gender Radio Buttons */}
          <fieldset className="border border-gray-300 rounded p-2">
            <legend className="text-sm font-medium px-2">Sex:</legend>
            <div className="flex space-x-3 items-center">
              <label className="inline-flex items-center space-x-2">
                <input type="radio" name="gender" value="female" />
                <span>Female</span>
              </label>
              <label className="inline-flex items-center space-x-2">
                <input type="radio" name="gender" value="male" />
                <span>Male</span>
              </label>
            </div>
          </fieldset>
        </div>

        

        {/* Nationality, Religion, Height, Weight, Blood Type */}
        <div className="grid grid-cols-7 gap-4">
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
        <div className="grid grid-cols-3 gap-4">
          <div className="flex flex-col col-span-2">
            <label className="text-xs font-semibold mb-1">Languages/ Dialect spoken at home:</label>
            <input type="text" placeholder="Answer Here..." className="border border-gray-300 rounded px-2 py-1" />
          </div>

          {/* Gender Radio Buttons */}
          <fieldset className="border border-gray-300 rounded p-2">
            <legend className="text-sm font-medium px-2">Status:</legend>
            <div className="flex space-x-8 items-center">
              <label className="inline-flex items-center space-x-2">
                <input type="radio" name="status" value="legitimate" />
                <span>Legitimate</span>
              </label>
              <label className="inline-flex items-center space-x-2">
                <input type="radio" name="status" value="biological" />
                <span>Biological</span>
              </label>
              <label className="inline-flex items-center space-x-2">
                <input type="radio" name="status" value="adopted" />
                <span>Adopted</span>
              </label>
            </div>
          </fieldset>
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

      {/* Next Page Button */}
      <div className="w-full max-w-6xl flex justify-end mt-8">
        <button
          className="bg-red-800 text-white px-6 py-2 rounded-md shadow hover:bg-[#7a0000] transition"
          onClick={onNext}
        >
          Next Page
        </button>
      </div>
    </div>
    </div>
  );
}
