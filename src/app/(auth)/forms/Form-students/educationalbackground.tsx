import React, { useState } from "react";

interface StudentEducationalBackgroundPageProps {
  onBack?: () => void;
  onNext?: () => void;
}

export default function StudentEducationalBackgroundPage({ onBack, onNext }: StudentEducationalBackgroundPageProps) {
  // State to hold school array, initially with one school
  const [school, setSchool] = useState([{}]);

  // Handler to add a new school
  const addSchool = () => {
    setSchool([...school, {}]);
  };

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
          <div className="font-bold text-lg tracking-wide py-2 text-white bg-[#a10000] rounded w-full text-center">EDUCATIONAL BACKGROUND</div>
        </div>

        {/* Sibling Info Fields */}
        {school.map((_, index) => (
          <fieldset key={index} className="border border-gray-300 rounded p-4">
            <legend className="block text-sm font-medium mb-1 text-black px-2">{`School #${index + 1}`}</legend>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pb-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-black">Gr./ Yr. Level:</label>
                <input type="number" placeholder="Answer Here..." className="border border-gray-300 rounded px-2 py-1 w-full text-black" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-black">Name of School:</label>
                <input type="text" placeholder="Answer Here..." className="border border-gray-300 rounded px-2 py-1 w-full text-black" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-black">School Address:</label>
                <input type="text" placeholder="Answer Here..." className="border border-gray-300 rounded px-2 py-1 w-full text-black" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-black">Inclusive Years:</label>
                <input type="text" placeholder="YYYY-YYYY" className="border border-gray-300 rounded px-2 py-1 w-full text-black" />
              </div>
            </div>
          </fieldset>
        ))}

        <div className="w-full flex justify-left mt-3">
          <button
            className="bg-red-800 text-white px-6 py-2 rounded-md shadow hover:bg-[#7a0000] transition"
            onClick={addSchool}
          >
            Add School
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Column Left */}  
          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-black">Honors/ Awards Recieved:</label>
              <input type="text" placeholder="Answer Here..." className="border border-gray-300 rounded px-2 py-1 w-full text-black" />
            </div>
          </div>

          

          {/* Column Right */}
          <div className="flex flex-col gap-4">
            <fieldset className="border border-gray-300 rounded p-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-black">Allergies:</label>
                <input type="text" placeholder="Answer Here..." className="border border-gray-300 rounded px-2 py-1 w-full text-black" />
              </div>
            </fieldset>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-black">Gr./ Yr. Level Repeated:</label>
                <input type="number" placeholder="Answer Here..." className="border border-gray-300 rounded px-2 py-1 w-full text-black" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-black">No. of Subjects Failed:</label>
                <input type="number" placeholder="Answer Here..." className="border border-gray-300 rounded px-2 py-1 w-full text-black" />
              </div>
            </div>
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
