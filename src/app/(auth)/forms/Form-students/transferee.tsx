import React from "react";

interface StudentTransfereeProps {
  onBack?: () => void;
  onNext?: () => void;
}

export default function StudentTransfereePage({ onBack, onNext }: StudentTransfereeProps) {
  return (
    <div className=" flex min-h-screen flex-col items-center py-8">
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
          <div className="font-bold text-lg tracking-wide py-2 text-white bg-[#a10000] rounded w-full text-center">FOR TRANSFEREES</div>
        </div>

        {/* Previous School Fields */}
        <fieldset className="border border-gray-300 rounded p-4">
            <legend className="block text-sm font-medium mb-1 text-black px-2">Previous School:</legend>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pb-4">
                <div>
                <label className="block text-sm font-medium mb-1 text-black">Name of School:</label>
                <input type="text" placeholder="Answer Here..." className="border border-gray-300 rounded px-2 py-1 w-full text-black" />
                </div>
                <div>
                <label className="block text-sm font-medium mb-1 text-black">School Address:</label>
                <input type="text" placeholder="Answer Here..." className="border border-gray-300 rounded px-2 py-1 w-full text-black" />
                </div>
                <div>
                <label className="block text-sm font-medium mb-1 text-black">Gr./ Yr. Level:</label>
                <input type="number" placeholder="Answer Here..." className="border border-gray-300 rounded px-2 py-1 w-full text-black" />
                </div>
            </div>
        </fieldset>

        {/* Present School Fields */}
        <fieldset className="border border-gray-300 rounded p-4">
            <legend className="block text-sm font-medium mb-1 text-black px-2">Present School:</legend>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pb-4">
                <div>
                <label className="block text-sm font-medium mb-1 text-black">Name of School:</label>
                <input type="text" placeholder="Answer Here..." className="border border-gray-300 rounded px-2 py-1 w-full text-black" />
                </div>
                <div>
                <label className="block text-sm font-medium mb-1 text-black">School Address:</label>
                <input type="text" placeholder="Answer Here..." className="border border-gray-300 rounded px-2 py-1 w-full text-black" />
                </div>
                <div>
                <label className="block text-sm font-medium mb-1 text-black">Gr./ Yr. Level:</label>
                <input type="number" placeholder="Answer Here..." className="border border-gray-300 rounded px-2 py-1 w-full text-black" />
                </div>
            </div>
        </fieldset>

        {/* Reason for Transfer */}
        <div>
          <label className="block text-sm font-medium mb-1 text-black">Reason for Transferring:</label>
          <div className="relative">
            <textarea
              rows={5}
              maxLength={250}
              placeholder="Answer Here..."
              className="input input-bordered w-full text-black border border-gray-300 rounded px-2 py-1 resize-none pt-2"
            />
            <span className="absolute bottom-2 right-4 text-xs text-gray-400">250</span>
          </div>
        </div>

        {/* Disciplinary Actions */}
        <div>
          <label className="block text-sm font-medium mb-1 text-black">Has the applicant been subjected to any disciplinary actions in school? If yes, please describe the action and the sanctions:</label>
          <div className="relative">
            <textarea
              rows={5}
              maxLength={250}
              placeholder="Answer Here..."
              className="input input-bordered w-full text-black border border-gray-300 rounded px-2 py-1 resize-none pt-2"
            />
            <span className="absolute bottom-2 right-4 text-xs text-gray-400">250</span>
          </div>
        </div>
      </div>
      

      {/* Next Page Button */}
      <div className="w-full flex justify-end mt-8">
        <button
          className="bg-red-800 text-white px-6 py-2 rounded-md shadow hover:bg-[#7a0000] transition"
          onClick={onNext}
        >
          Confirm
        </button>
      </div>
    </div>
  );
}
