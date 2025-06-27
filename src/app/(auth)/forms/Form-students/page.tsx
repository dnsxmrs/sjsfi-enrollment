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

// Define the form data interface
interface FormData {
  personalData: {
    academicYear: string;
    admissionGradeYear: string;
    familyName: string;
    firstName: string;
    middleName: string;
    nickname: string;
    birthDate: string;
    placeOfBirth: string;
    age: string;
    birthOrder: string;
    siblingsCount: string;
    gender: string;
    nationality: string;
    religion: string;
    height: string;
    weight: string;
    bloodType: string;
    languages: string;
    status: string;
    landline: string;
    mobile: string;
    email: string;
    homeAddress: string;
    homeCity: string;
    homeStateProvince: string;
    homeZip: string;
    provincialAddress: string;
    provincialCity: string;
    provincialStateProvince: string;
    provincialZip: string;
    talents: string;
    hobbies: string;
  };
  healthHistory: {
    childhoodDiseases: string;
    allergies: string;
    otherMedicalConditions: string;
    immunizations: string;
    physicalHandicaps: string;
  };
  fatherBackground: {
    familyName: string;
    firstName: string;
    middleName: string;
    birthDate: string;
    placeOfBirth: string;
    age: string;
    nationality: string;
    religion: string;
    landlineNumber: string;
    mobileNumber: string;
    emailAddress: string;
    homeAddress: string;
    city: string;
    stateProvince: string;
    zipPostalCode: string;
    educationalAttainmentCourse: string;
    occupationalPositionHeld: string;
    employerCompany: string;
    companyAddress: string;
    businessTelephoneNumber: string;
    annualIncome: string;
    statusOfParent: string;
  };
  motherBackground: {
    familyName: string;
    firstName: string;
    middleName: string;
    birthDate: string;
    placeOfBirth: string;
    age: string;
    nationality: string;
    religion: string;
    landlineNumber: string;
    mobileNumber: string;
    emailAddress: string;
    homeAddress: string;
    city: string;
    stateProvince: string;
    zipPostalCode: string;
    educationalAttainmentCourse: string;
    occupationalPositionHeld: string;
    employerCompany: string;
    companyAddress: string;
    businessTelephoneNumber: string;
    annualIncome: string;
    statusOfParent: string;
  };
  guardianBackground: {
    familyName: string;
    firstName: string;
    middleName: string;
    birthDate: string;
    placeOfBirth: string;
    age: string;
    nationality: string;
    religion: string;
    landlineNumber: string;
    mobileNumber: string;
    emailAddress: string;
    homeAddress: string;
    city: string;
    stateProvince: string;
    zipPostalCode: string;
    educationalAttainmentCourse: string;
    occupationalPositionHeld: string;
    employerCompany: string;
    companyAddress: string;
    businessTelephoneNumber: string;
    annualIncome: string;
    statusOfParent: string;
    relationToApplicant: string;
  };
  familyMembers: Array<{
    familyName: string;
    firstName: string;
    middleName: string;
    birthDate: string;
    age: string;
    gradeYearLevel: string;
    schoolEmployer: string;
  }>;
  educationalBackground: Array<{
    gradeYearLevel: string;
    schoolName: string;
    schoolAddress: string;
    inclusiveYears: string;
    honorsAwardsReceived: string;
    gradeYearLevelRepeated: string;
    numberOfSubjectsFailed: string;
  }>;
  transferee: {
    previousSchool: {
      name: string;
      address: string;
      gradeYearLevel: string;
    };
    presentSchool: {
      name: string;
      address: string;
      gradeYearLevel: string;
    };
    reasonForTransfer: string;
    disciplinaryActions: string;
  };
}

// Create context for form data
const FormDataContext = createContext<{
  formData: FormData;
  updateFormData: <K extends keyof FormData>(section: K, data: FormData[K]) => void;
} | null>(null);

// Custom hook to use form data
export const useFormData = () => {
  const context = useContext(FormDataContext);
  if (!context) {
    throw new Error('useFormData must be used within a FormDataProvider');
  }
  return context;
};

export default function StudentApplicationPagedForm() {
  const [page, setPage] = useState(0);
  const [confirmed, setConfirmed] = useState(false);

  // Initialize form data state
  const [formData, setFormData] = useState<FormData>({
    personalData: {
      academicYear: "",
      admissionGradeYear: "",
      familyName: "",
      firstName: "",
      middleName: "",
      nickname: "",
      birthDate: "",
      placeOfBirth: "",
      age: "",
      birthOrder: "",
      siblingsCount: "",
      gender: "",
      nationality: "",
      religion: "",
      height: "",
      weight: "",
      bloodType: "",
      languages: "",
      status: "",
      landline: "",
      mobile: "",
      email: "",
      homeAddress: "",
      homeCity: "",
      homeStateProvince: "",
      homeZip: "",
      provincialAddress: "",
      provincialCity: "",
      provincialStateProvince: "",
      provincialZip: "",
      talents: "",
      hobbies: "",
    },
    healthHistory: {
      childhoodDiseases: "",
      allergies: "",
      otherMedicalConditions: "",
      immunizations: "",
      physicalHandicaps: "",
    },
    fatherBackground: {
      familyName: "",
      firstName: "",
      middleName: "",
      birthDate: "",
      placeOfBirth: "",
      age: "",
      nationality: "",
      religion: "",
      landlineNumber: "",
      mobileNumber: "",
      emailAddress: "",
      homeAddress: "",
      city: "",
      stateProvince: "",
      zipPostalCode: "",
      educationalAttainmentCourse: "",
      occupationalPositionHeld: "",
      employerCompany: "",
      companyAddress: "",
      businessTelephoneNumber: "",
      annualIncome: "",
      statusOfParent: "",
    },
    motherBackground: {
      familyName: "",
      firstName: "",
      middleName: "",
      birthDate: "",
      placeOfBirth: "",
      age: "",
      nationality: "",
      religion: "",
      landlineNumber: "",
      mobileNumber: "",
      emailAddress: "",
      homeAddress: "",
      city: "",
      stateProvince: "",
      zipPostalCode: "",
      educationalAttainmentCourse: "",
      occupationalPositionHeld: "",
      employerCompany: "",
      companyAddress: "",
      businessTelephoneNumber: "",
      annualIncome: "",
      statusOfParent: "",
    },
    guardianBackground: {
      familyName: "",
      firstName: "",
      middleName: "",
      birthDate: "",
      placeOfBirth: "",
      age: "",
      nationality: "",
      religion: "",
      landlineNumber: "",
      mobileNumber: "",
      emailAddress: "",
      homeAddress: "",
      city: "",
      stateProvince: "",
      zipPostalCode: "",
      educationalAttainmentCourse: "",
      occupationalPositionHeld: "",
      employerCompany: "",
      companyAddress: "",
      businessTelephoneNumber: "",
      annualIncome: "",
      statusOfParent: "",
      relationToApplicant: "",
    },
    familyMembers: [{
      familyName: "",
      firstName: "",
      middleName: "",
      birthDate: "",
      age: "",
      gradeYearLevel: "",
      schoolEmployer: "",
    }],
    educationalBackground: [{
      gradeYearLevel: "",
      schoolName: "",
      schoolAddress: "",
      inclusiveYears: "",
      honorsAwardsReceived: "",
      gradeYearLevelRepeated: "",
      numberOfSubjectsFailed: "",
    }],
    transferee: {
      previousSchool: {
        name: "",
        address: "",
        gradeYearLevel: "",
      },
      presentSchool: {
        name: "",
        address: "",
        gradeYearLevel: "",
      },
      reasonForTransfer: "",
      disciplinaryActions: "",
    },
  });

  // Function to update form data
  const updateFormData = <K extends keyof FormData>(section: K, data: FormData[K]) => {
    setFormData(prev => ({
      ...prev,
      [section]: data
    }));
  };

  if (page === 8) {
    return (
      <FormDataContext.Provider value={{ formData, updateFormData }}>
        <StudentTransfereePage onBack={() => setPage(7)} />
      </FormDataContext.Provider>
    );
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
