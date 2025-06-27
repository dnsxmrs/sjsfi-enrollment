"use client";

import React, { useState, createContext, useContext } from "react";
import StudentPersonalDataPage from "./personaldata";
import StudentHealthHistoryPage from "./healthhistory";
import FatherBackgroundPage from "./fatherbackground";
import MotherBackgroundPage from "./motherbackground";
import GuardianBackgroundPage from "./guardianbackground";
import StudentFamilyMembersPage from "./familymembers";
import StudentEducationalBackgroundPage from "./educationalbackground";
import StudentTransfereePage from "./transferee";
import MedicalHistoryPage1 from "../Forms-medical/medicalhistoryP1";
import MedicalHistoryPage2 from "../Forms-medical/medicalhistoryP2";

export default function StudentApplicationPagedForm() {
  const [page, setPage] = useState(0);
  const [confirmed, setConfirmed] = useState(false);

  if (page === 10) {
    return <MedicalHistoryPage2 onBack={() => setPage(9)} />;
  }

  if (page === 9) {
    return <MedicalHistoryPage1 onBack={() => setPage(8)} onNext={() => setPage(10)}/>;
  }

  if (page === 8) {
    return <StudentTransfereePage onBack={() => setPage(7)} onNext={() => setPage(9)}/>;
  }

  if (page === 7) {
    return (
      <FormDataContext.Provider value={{ formData, updateFormData }}>
        <StudentEducationalBackgroundPage onBack={() => setPage(6)} onNext={() => setPage(8)}/>
      </FormDataContext.Provider>
    );
  }

  if (page === 6) {
    return (
      <FormDataContext.Provider value={{ formData, updateFormData }}>
        <StudentFamilyMembersPage onBack={() => setPage(5)} onNext={() => setPage(7)}/>
      </FormDataContext.Provider>
    );
  }

  if (page === 5) {
    return (
      <FormDataContext.Provider value={{ formData, updateFormData }}>
        <GuardianBackgroundPage onBack={() => setPage(4)} onNext={() => setPage(6)} />
      </FormDataContext.Provider>
    );
  }

  if (page === 4) {
    return (
      <FormDataContext.Provider value={{ formData, updateFormData }}>
        <MotherBackgroundPage onBack={() => setPage(3)} onNext={() => setPage(5)} />
      </FormDataContext.Provider>
    );
  }

  if (page === 3) {
    return (
      <FormDataContext.Provider value={{ formData, updateFormData }}>
        <FatherBackgroundPage onBack={() => setPage(2)} onNext={() => setPage(4)} />
      </FormDataContext.Provider>
    );
  }

  if (page === 2) {
    return (
      <FormDataContext.Provider value={{ formData, updateFormData }}>
        <StudentHealthHistoryPage onBack={() => setPage(1)} onNext={() => setPage(3)} />
      </FormDataContext.Provider>
    );
  }

  if (page === 1) {
    return (
      <FormDataContext.Provider value={{ formData, updateFormData }}>
        <StudentPersonalDataPage onBack={() => setPage(0)} onNext={() => setPage(2)} />
      </FormDataContext.Provider>
    );
  }

  return (
    <FormDataContext.Provider value={{ formData, updateFormData }}>
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
    </FormDataContext.Provider>
  );
}
