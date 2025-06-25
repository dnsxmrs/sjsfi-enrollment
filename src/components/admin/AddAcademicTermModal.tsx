import React, { useState } from "react";

type AddAcademicTermModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function AddAcademicTermModal({ isOpen, onClose }: AddAcademicTermModalProps) {
  const [term, setTerm] = useState("");
  const [status, setStatus] = useState<"Upcoming" | "Ongoing" | "">("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-gray-600/50 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-md shadow-lg w-full max-w-sm">
        <h2 className="text-gray-700 text-xl font-bold text-center mb-4">Add Academic Term</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Academic Term:</label>
          <input
            type="text"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            placeholder="SY 2024–2025"
            className="text-gray-700 w-full border border-red-800 px-3 py-2 rounded-md focus:outline-none"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Status:</label>
          <div className="flex gap-4">
            <button
              type="button"
              className={`px-3 py-1 rounded-full text-black text-sm font-semibold ${
                status === "Upcoming" ? "bg-blue-500 text-white" : "bg-gray-300"
              }`}
              onClick={() => setStatus("Upcoming")}
            >
              Upcoming
            </button>
            <button
              type="button"
              className={`px-3 py-1 rounded-full text-black text-sm font-semibold ${
                status === "Ongoing" ? "bg-yellow-300" : "bg-gray-300"
              }`}
              onClick={() => setStatus("Ongoing")}
            >
              Ongoing
            </button>
          </div>
        </div>

        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={onClose}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-md"
          >
            Cancel
          </button>
          <button
            type="button"
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-md"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
