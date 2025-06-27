import React from "react";

interface StudentPersonalDataPageProps {
  onBack?: () => void;
  onNext?: () => void;
}

export default function StudentPersonalDataPage({ onBack, onNext }: StudentPersonalDataPageProps) {
  return (
    <div className="w-full min-h-screen flex flex-col items-center py-8">
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

      {/* Card */}
      <div className="w-full bg-white rounded-lg shadow p-8 border border-gray-200 flex flex-col gap-6">
        
        {/* Section Title */}
        <div className="w-full flex justify-center">
          <div className="font-bold text-lg tracking-wide py-2 text-white bg-[#a10000] rounded w-full text-center">PERSONAL DATA</div>
        </div>
        {/* Academic Year and Grade */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-black">Academic Year:</label>
            <input type="text" placeholder="Answer Here.." className="border border-gray-300 rounded px-2 py-1 w-full text-black" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-black">Admission to Grade/ Year:</label>
            <input type="text" placeholder="Answer Here.." className="border border-gray-300 rounded px-2 py-1 w-full text-black" />
          </div>
        </div>

        

        {/* Name Fields */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-black">Family Name:</label>
            <input type="text" placeholder="Answer Here.." className="border border-gray-300 rounded px-2 py-1 w-full text-black" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-black">First Name:</label>
            <input type="text" placeholder="Answer Here.." className="border border-gray-300 rounded px-2 py-1 w-full text-black" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-black">Middle Name:</label>
            <input type="text" placeholder="Answer Here.." className="border border-gray-300 rounded px-2 py-1 w-full text-black" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-black">Nickname:</label>
            <input type="text" placeholder="Answer Here.." className="border border-gray-300 rounded px-2 py-1 w-full text-black" />
          </div>
        </div>

        {/* Birth, Age, Order, Siblings, Gender */}
        <div className="grid grid-cols-1 md:grid-cols-7 gap-4 items-end">
          <div className="md:col-span-1">
            <label className="block text-sm font-medium mb-1 text-black">Birth Date:</label>
            <input type="date" className="border border-gray-300 rounded px-2 py-1 w-full text-black" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1 text-black">Place of Birth:</label>
            <input type="text" placeholder="Answer Here.." className="border border-gray-300 rounded px-2 py-1 w-full text-black" />
          </div>
          <div className="md:col-span-1">
            <label className="block text-sm font-medium mb-1 text-black">Age:</label>
            <input type="text" placeholder="Answer Here.." className="border border-gray-300 rounded px-2 py-1 w-full text-black" />
          </div>
          <div className="md:col-span-1">
            <label className="block text-sm font-medium mb-1 text-black">Birth Order:</label>
            <input type="text" placeholder="Answer Here.." className="border border-gray-300 rounded px-2 py-1 w-full text-black" />
          </div>
          <div className="md:col-span-1">
            <label className="block text-sm font-medium mb-1 text-black">Number of Siblings:</label>
            <input type="text" placeholder="Answer Here.." className="border border-gray-300 rounded px-2 py-1 w-full text-black" />
          </div>
          <fieldset className="border border-gray-300 rounded p-2">
            <legend className="block text-sm font-medium mb-1 text-black px-2">Sex:</legend>
            <div className="flex flex-col md:flex-row gap-4 mt-2 text-black">
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
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-black">Nationality:</label>
            <input type="text" placeholder="Answer Here.." className="border border-gray-300 rounded px-2 py-1 w-full text-black" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-black">Religion:</label>
            <input type="text" placeholder="Answer Here.." className="border border-gray-300 rounded px-2 py-1 w-full text-black" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-black">Height:</label>
            <input type="text" placeholder="Answer Here.." className="border border-gray-300 rounded px-2 py-1 w-full text-black" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-black">Weight:</label>
            <input type="text" placeholder="Answer Here.." className="border border-gray-300 rounded px-2 py-1 w-full text-black" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-black">Blood Type:</label>
            <input type="text" placeholder="Answer Here.." className="border border-gray-300 rounded px-2 py-1 w-full text-black" />
          </div>
        </div>

        {/* Languages, Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
          <div>
            <label className="block text-sm font-medium mb-1 text-black">Languages/ Dialect spoken at home:</label>
            <input type="text" placeholder="Answer Here.." className="border border-gray-300 rounded px-2 py-1 w-full text-black" />
          </div>
          
          <div className="flex items-center gap-6 mt-6 md:mt-0">
            <fieldset className="border border-gray-300 rounded p-2">
            <div className="flex flex-col md:flex-row gap-4 mt-2 text-black">
              <input type="radio" name="status" className="radio radio-sm text-black bg-gray-100 border border-gray-300" />
              <label className="text-sm font-medium text-black">Legitimate</label>
              <input type="radio" name="status" className="radio radio-sm text-black bg-gray-100 border border-gray-300" />
              <label className="text-sm font-medium text-black">Biological</label>
              <input type="radio" name="status" className="radio radio-sm text-black bg-gray-100 border border-gray-300" />
              <label className="text-sm font-medium text-black">Adopted</label>
            </div>
            </fieldset>
          </div>
        </div>

        {/* Landline, Mobile, Email */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-black">Landline Number:</label>
            <input type="text" placeholder="Answer Here.." className="border border-gray-300 rounded px-2 py-1 w-full text-black" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-black">Mobile Number:</label>
            <input type="text" placeholder="Answer Here.." className="border border-gray-300 rounded px-2 py-1 w-full text-black" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-black">E-mail Address:</label>
            <input type="text" placeholder="Answer Here.." className="border border-gray-300 rounded px-2 py-1 w-full text-black" />
          </div>
        </div>

        {/* Home Address */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1 text-black">Home Address:</label>
            <input type="text" placeholder="Answer Here.." className="border border-gray-300 rounded px-2 py-1 w-full text-black" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-black">City:</label>
            <input type="text" placeholder="Answer Here.." className="border border-gray-300 rounded px-2 py-1 w-full text-black" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-black">State/ Province:</label>
            <input type="text" placeholder="Answer Here.." className="border border-gray-300 rounded px-2 py-1 w-full text-black" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-black">Zip/ Postal Code:</label>
            <input type="text" placeholder="Answer Here.." className="border border-gray-300 rounded px-2 py-1 w-full text-black" />
          </div>
        </div>

        {/* Provincial Address */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1 text-black">Provincial Address:</label>
            <input type="text" placeholder="Answer Here.." className="border border-gray-300 rounded px-2 py-1 w-full text-black" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-black">City:</label>
            <input type="text" placeholder="Answer Here.." className="border border-gray-300 rounded px-2 py-1 w-full text-black" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-black">State/ Province:</label>
            <input type="text" placeholder="Answer Here.." className="border border-gray-300 rounded px-2 py-1 w-full text-black" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-black">Zip/ Postal Code:</label>
            <input type="text" placeholder="Answer Here.." className="border border-gray-300 rounded px-2 py-1 w-full text-black" />
          </div>
        </div>

        {/* Talents/Skills and Hobbies */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
          <div className="flex items-center gap-2">
            <label className="block text-sm font-medium mb-1 text-black">Talents/ Special Skills:</label>
            <input type="text" placeholder="Answer Here.." className="border border-gray-300 rounded px-2 py-1 w-full text-black" />
            <span className="text-gray-400 ml-2">150</span>
          </div>
          <div className="flex items-center gap-2">
            <label className="block text-sm font-medium mb-1 text-black">Hobbies and Interests:</label>
            <input type="text" placeholder="Answer Here.." className="border border-gray-300 rounded px-2 py-1 w-full text-black" />
            <span className="text-gray-400 ml-2">150</span>
          </div>
        </div>
      </div>

      {/* Next Page Button */}
      <div className="w-full flex justify-end mt-8">
        <button
          className="bg-red-800 text-white px-6 py-2 rounded-md shadow hover:bg-[#7a0000] transition"
          onClick={onNext}
        >
          Next Page
        </button>
      </div>
    </div>
  );
}
