"use client";

import React, { useState } from "react";
import StudentPersonalDataPage from "./personaldata";
import StudentHealthHistoryPage from "./healthhistory";
import FatherBackgroundPage from "./fatherbackground";
import MotherBackgroundPage from "./motherbackground";
import GuardianBackgroundPage from "./guardianbackground";
import StudentFamilyMembersPage from "./familymembers";
import StudentEducationalBackgroundPage from "./educationalbackground";
import StudentTransfereePage from "./transferee";

export default function StudentApplicationPagedForm() {
  const [page, setPage] = useState(0);
  const [confirmed, setConfirmed] = useState(false);

  if (page === 8) {
    return <StudentTransfereePage onBack={() => setPage(7)} />;
  }

  if (page === 7) {
    return <StudentEducationalBackgroundPage onBack={() => setPage(6)} onNext={() => setPage(8)}/>;
  }

  if (page === 6) {
    return <StudentFamilyMembersPage onBack={() => setPage(5)} onNext={() => setPage(7)}/>;
  }

  if (page === 5) {
    return <GuardianBackgroundPage onBack={() => setPage(4)} onNext={() => setPage(6)} />;
  }

  if (page === 4) {
    return <MotherBackgroundPage onBack={() => setPage(3)} onNext={() => setPage(5)} />;
  }

  if (page === 3) {
    return <FatherBackgroundPage onBack={() => setPage(2)} onNext={() => setPage(4)} />;
  }

  if (page === 2) {
    return <StudentHealthHistoryPage onBack={() => setPage(1)} onNext={() => setPage(3)} />;
  }

  if (page === 1) {
    return <StudentPersonalDataPage onBack={() => setPage(0)} onNext={() => setPage(2)} />;
  }

  return (
    <div className="w-full min-h-screen bg-[#f7f7f7] flex flex-col items-center py-8">
      {/* Header */}
      <div className="w-full flex flex-col items-center mb-6">
        <div className="w-full flex items-center gap-4 mt-2">
          <button className="bg-[#a10000] text-white px-8 py-2 rounded-md font-semibold text-md shadow hover:bg-[#7a0000] transition">Cancel</button>
          <div className="flex-1 flex justify-center">
            <h1 className="w-full bg-white rounded-md py-2 px-6 font-bold text-black text-lg tracking-widest text-center flex-grow ml-3 shadow">
              STUDENT APPLICATION FORM
            </h1>
          </div>
        </div>
      </div>

      {/* Card */}
      <div className="w-full bg-white rounded-lg shadow p-10 border border-gray-200 flex flex-col gap-8">
        <div>
          <p className="font-semibold text-lg md:text-xl mb-6 text-black">
            Before continuing with the student application, please ensure you have the following:
          </p>
          <ol className="list-decimal list-inside text-base md:text-lg text-black pl-4 space-y-2">
            <li>Preliminary interview upon application</li>
            <li>Copy of Grades and Transcript Records (if available) fr evaluation only;</li>
            <li>One (1) copy of recent 2&quot; x 2&quot; ID picture (Please write your name and grade/year at the back of the photo)</li>
            <li>Php 300.00 testing fee (non-refundable)</li>
          </ol>
        </div>
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

      {/* Continue Button */}
      <div className="w-full flex justify-end mt-8">
        <button
          type="button"
          disabled={!confirmed}
          className={`bg-red-800 text-white px-6 py-2 rounded-md ${
            confirmed ? 'hover:bg-red-900 cursor-pointer' : 'opacity-50 cursor-not-allowed'
          }`}
          onClick={() => setPage(1)}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
