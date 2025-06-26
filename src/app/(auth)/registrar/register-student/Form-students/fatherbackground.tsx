import React, { useState } from "react";
import Image from "next/image";

interface FatherBackgroundPageProps {
  onBack?: () => void;
  onNext?: () => void;
}

export default function FatherBackgroundPage({ onBack, onNext }: FatherBackgroundPageProps) {
  const [status, setStatus] = useState("");
  const [otherStatus, setOtherStatus] = useState("");

  return (
    <div className="w-full min-h-screen bg-[#f7f7f7] flex flex-col items-center py-8">
      {/* Header */}
      <div className="w-full max-w-6xl flex flex-col items-center mb-6">
        <div className="flex items-center w-full justify-between mb-2">
          <div className="flex items-center gap-3">
            <Image
              src="/assets/sjsfi_logo.svg"
              alt="SJSFI Logo"
              width={90}
              height={90}
              className="mb-4"
            />
            <div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-widest text-[#a10000]">SAINT JOSEPH SCHOOL OF FAIRVIEW INC.</h1>
              <p className="text-xs md:text-sm text-[#a10000] font-semibold tracking-wide">Atherton St. cor. Pound St. Ph.8 North Fairview, Q.C,</p>
            </div>
          </div>
          <div className="text-right text-xs md:text-sm text-[#a10000] font-semibold">
            Tel. No. 461-3272 | 461-3346
          </div>
        </div>
        <div className="w-full flex items-center gap-4 mt-2">
          <button
            className="bg-[#a10000] text-white px-8 py-2 rounded-md font-semibold text-md shadow hover:bg-[#7a0000] transition"
            onClick={onBack}
          >
            Back
          </button>
          <div className="flex-1 flex justify-center">
            <div className="rounded-md shadow px-8 py-2 font-bold text-lg tracking-wide border border-gray-200 bg-gray-100 text-black">STUDENT APPLICATION FORM</div>
          </div>
        </div>
      </div>

      {/* Card */}
      <div className="w-full max-w-6xl bg-white rounded-lg shadow p-8 border border-gray-200 flex flex-col gap-6">
        {/* Section Title */}
        <div className="w-full flex justify-center">
          <div className="font-bold text-lg tracking-wide py-2 text-white bg-[#a10000] rounded w-full text-center">FAMILY BACKGROUND: FATHER</div>
        </div>

        {/* Father Background Fields */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-black">Family Name:</label>
            <input type="text" placeholder="Answer Here..." className="input input-bordered w-full text-black bg-gray-100 border border-gray-300" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-black">First Name:</label>
            <input type="text" placeholder="Answer Here..." className="input input-bordered w-full text-black bg-gray-100 border border-gray-300" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-black">Middle Name:</label>
            <input type="text" placeholder="Answer Here..." className="input input-bordered w-full text-black bg-gray-100 border border-gray-300" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-black">Birth Date:</label>
            <input type="date" className="input input-bordered w-full text-black bg-gray-100 border border-gray-300" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-black">Place of Birth:</label>
            <input type="text" placeholder="Answer Here..." className="input input-bordered w-full text-black bg-gray-100 border border-gray-300" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-black">Age:</label>
            <input type="text" placeholder="Answer Here..." className="input input-bordered w-full text-black bg-gray-100 border border-gray-300" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-black">Nationality:</label>
            <input type="text" placeholder="Answer Here..." className="input input-bordered w-full text-black bg-gray-100 border border-gray-300" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-black">Religion:</label>
            <input type="text" placeholder="Answer Here..." className="input input-bordered w-full text-black bg-gray-100 border border-gray-300" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-black">Landline Number:</label>
            <input type="text" placeholder="Answer Here..." className="input input-bordered w-full text-black bg-gray-100 border border-gray-300" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-black">Mobile Number:</label>
            <input type="text" placeholder="Answer Here..." className="input input-bordered w-full text-black bg-gray-100 border border-gray-300" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-black">E-mail Address:</label>
            <input type="text" placeholder="Answer Here..." className="input input-bordered w-full text-black bg-gray-100 border border-gray-300" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-1">
            <label className="block text-sm font-medium mb-1 text-black">Home Address:</label>
            <input type="text" placeholder="Answer Here..." className="input input-bordered w-full text-black bg-gray-100 border border-gray-300" />
          </div>
          <div className="md:col-span-1">
            <label className="block text-sm font-medium mb-1 text-black">City:</label>
            <input type="text" placeholder="Answer Here..." className="input input-bordered w-full text-black bg-gray-100 border border-gray-300" />
          </div>
          <div className="md:col-span-1">
            <label className="block text-sm font-medium mb-1 text-black">State/ Province:</label>
            <input type="text" placeholder="Answer Here..." className="input input-bordered w-full text-black bg-gray-100 border border-gray-300" />
          </div>
          <div className="md:col-span-1">
            <label className="block text-sm font-medium mb-1 text-black">Zip/ Postal Code:</label>
            <input type="text" placeholder="Answer Here..." className="input input-bordered w-full text-black bg-gray-100 border border-gray-300" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-black">Educational Attainment/ Course:</label>
            <input type="text" placeholder="Answer Here..." className="input input-bordered w-full text-black bg-gray-100 border border-gray-300" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-black">Occupational/ Position Held:</label>
            <input type="text" placeholder="Answer Here..." className="input input-bordered w-full text-black bg-gray-100 border border-gray-300" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-black">Employer/ Company:</label>
            <input type="text" placeholder="Answer Here..." className="input input-bordered w-full text-black bg-gray-100 border border-gray-300" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-black">Company Address:</label>
            <input type="text" placeholder="Answer Here..." className="input input-bordered w-full text-black bg-gray-100 border border-gray-300" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-black">City:</label>
            <input type="text" placeholder="Answer Here..." className="input input-bordered w-full text-black bg-gray-100 border border-gray-300" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-black">Business Telephone Number:</label>
            <input type="text" placeholder="Answer Here..." className="input input-bordered w-full text-black bg-gray-100 border border-gray-300" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-black">Annual Income:</label>
            <input type="text" placeholder="Answer Here..." className="input input-bordered w-full text-black bg-gray-100 border border-gray-300" />
          </div>
        </div>

        {/* Status of Parent */}
        <div>
          <label className="block text-sm font-medium mb-1 text-black">Status of Parent:</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
            <label className="flex items-center gap-2 text-black font-medium">
              <input
                type="radio"
                name="status"
                className="radio radio-sm text-black bg-gray-100 border border-gray-300"
                checked={status === "Married"}
                onChange={() => setStatus("Married")}
              /> Married
            </label>
            <label className="flex items-center gap-2 text-black font-medium">
              <input
                type="radio"
                name="status"
                className="radio radio-sm text-black bg-gray-100 border border-gray-300"
                checked={status === "Single Parent"}
                onChange={() => setStatus("Single Parent")}
              /> Single Parent
            </label>
            <label className="flex items-center gap-2 text-black font-medium">
              <input
                type="radio"
                name="status"
                className="radio radio-sm text-black bg-gray-100 border border-gray-300"
                checked={status === "Separated"}
                onChange={() => setStatus("Separated")}
              /> Separated
            </label>
            <label className="flex items-center gap-2 text-black font-medium">
              <input
                type="radio"
                name="status"
                className="radio radio-sm text-black bg-gray-100 border border-gray-300"
                checked={status === "Widowed"}
                onChange={() => setStatus("Widowed")}
              /> Widowed
            </label>
            <label className="flex items-center gap-2 text-black font-medium">
              <input
                type="radio"
                name="status"
                className="radio radio-sm text-black bg-gray-100 border border-gray-300"
                checked={status === "Widowed, Remarried"}
                onChange={() => setStatus("Widowed, Remarried")}
              /> Widowed, Remarried
            </label>
            <label className="flex items-center gap-2 text-black font-medium">
              <input
                type="radio"
                name="status"
                className="radio radio-sm text-black bg-gray-100 border border-gray-300"
                checked={status === "Others"}
                onChange={() => setStatus("Others")}
              /> Others:
              {status === "Others" && (
                <input
                  type="text"
                  className="input input-bordered text-black bg-gray-100 border border-gray-300 ml-2"
                  placeholder="Please specify"
                  value={otherStatus}
                  onChange={e => setOtherStatus(e.target.value)}
                  style={{ width: 120 }}
                />
              )}
            </label>
          </div>
        </div>
      </div>

      {/* Next Page Button */}
      <div className="w-full max-w-6xl flex justify-end mt-8">
        <button
          className="bg-[#a10000] text-white px-10 py-2 rounded-md font-semibold text-lg shadow hover:bg-[#7a0000] transition"
          onClick={onNext}
        >
          Next Page
        </button>
      </div>
    </div>
  );
}
