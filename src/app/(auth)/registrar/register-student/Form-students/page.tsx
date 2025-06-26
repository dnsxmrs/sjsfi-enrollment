"use client";

import React, { useState } from "react";
import StudentPersonalDataPage from "./personaldata";
import StudentHealthHistoryPage from "./healthhistory";
import FatherBackgroundPage from "./fatherbackground";
import MotherBackgroundPage from "./motherbackground";
import GuardianBackgroundPage from "./guardianbackground";
import Image from "next/image";

export default function StudentApplicationPagedForm() {
  const [page, setPage] = useState(0);

  if (page === 5) {
    return <GuardianBackgroundPage onBack={() => setPage(4)} />;
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
          <button className="bg-[#a10000] text-white px-8 py-2 rounded-md font-semibold text-md shadow hover:bg-[#7a0000] transition">Cancel</button>
          <div className="flex-1 flex justify-center">
            <div className="rounded-md shadow px-8 py-2 font-bold text-lg tracking-wide border border-gray-200 bg-gray-100 text-black">STUDENT APPLICATION FORM</div>
          </div>
        </div>
      </div>

      {/* Card */}
      <div className="w-full max-w-6xl bg-white rounded-lg shadow p-10 border border-gray-200 flex flex-col gap-8">
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
        <div className="flex items-center mt-2">
          <input type="checkbox" className="checkbox checkbox-md mr-2 border-[#a10000] text-[#a10000]" />
          <span className="text-[#a10000] text-base md:text-lg">I hereby confirm that I have completed all the required tasks and have all the necessary items.</span>
        </div>
      </div>

      {/* Continue Button */}
      <div className="w-full max-w-6xl flex justify-end mt-8">
        <button
          className="bg-[#a10000] text-white px-10 py-2 rounded-md font-semibold text-lg shadow hover:bg-[#7a0000] transition"
          onClick={() => setPage(1)}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
