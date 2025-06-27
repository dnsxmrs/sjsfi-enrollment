import React from "react";
import Image from "next/image";

interface StudentHealthHistoryPageProps {
  onBack?: () => void;
  onNext?: () => void;
}

export default function StudentHealthHistoryPage({ onBack, onNext }: StudentHealthHistoryPageProps) {
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
          <div className="font-bold text-lg tracking-wide py-2 text-white bg-[#a10000] rounded w-full text-center">HEALTH HISTORY</div>
        </div>

        {/* Health History Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-black">Childhood Diseases:</label>
              <input type="text" placeholder="Answer Here..." className="input input-bordered w-full text-black bg-gray-100 border border-gray-300" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-black">Other Medical Conditions:</label>
              <input type="text" placeholder="Answer Here..." className="input input-bordered w-full text-black bg-gray-100 border border-gray-300" />
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-black">Allergies:</label>
              <input type="text" placeholder="Answer Here..." className="input input-bordered w-full text-black bg-gray-100 border border-gray-300" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-black">Immunizations:</label>
              <input type="text" placeholder="Answer Here..." className="input input-bordered w-full text-black bg-gray-100 border border-gray-300" />
            </div>
          </div>
        </div>

        {/* Physical Handicaps / Special Needs */}
        <div>
          <label className="block text-sm font-medium mb-1 text-black">Any Physical handicaps or special needs which should be taken in consideration (please specify):</label>
          <div className="relative">
            <textarea
              rows={5}
              maxLength={250}
              placeholder="Answer Here..."
              className="input input-bordered w-full text-black bg-gray-100 border border-gray-300 resize-none pt-2"
            />
            <span className="absolute bottom-2 right-4 text-xs text-gray-400">250</span>
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
