import React, { useState } from "react";
import ReviewModalFormStudents from "@/components/forms/ReviewModalFormStudents";

interface StudentTransfereeProps {
  onBack?: () => void;
  onNext?: () => void;
}

export default function StudentTransfereePage({ onBack, onNext }: StudentTransfereeProps) {
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Example state for transferee data, replace with actual state management or props as needed
  const [transfereeData, setTransfereeData] = useState({
    previousSchool: { name: "", address: "", gradeYearLevel: "" },
    presentSchool: { name: "", address: "", gradeYearLevel: "" },
    reasonForTransfer: "",
    disciplinaryActions: "",
  });

  const [familyMembers, setFamilyMembers] = useState([
    {
      familyName: "Doe",
      firstName: "John",
      middleName: "A",
      birthDate: "2000-01-01",
      age: "23",
      gradeYearLevel: "12",
      schoolEmployer: "ABC School",
    },
    {
      familyName: "Doe",
      firstName: "Jane",
      middleName: "B",
      birthDate: "2003-05-10",
      age: "20",
      gradeYearLevel: "10",
      schoolEmployer: "XYZ Company",
    },
  ]);

  const [educationalBackground, setEducationalBackground] = useState([
    {
      gradeYearLevel: "10",
      schoolName: "High School A",
      schoolAddress: "123 Main St",
      inclusiveYears: "2015-2019",
      honorsAwardsReceived: "Honor Roll",
      gradeYearLevelRepeated: "None",
      numberOfSubjectsFailed: "0",
    },
    {
      gradeYearLevel: "11",
      schoolName: "High School B",
      schoolAddress: "456 Elm St",
      inclusiveYears: "2019-2020",
      honorsAwardsReceived: "Math Award",
      gradeYearLevelRepeated: "None",
      numberOfSubjectsFailed: "1",
    },
  ]);

  const handleFinalSubmit = () => {
    setIsSubmitting(true);
    // TODO: Implement submission logic here, e.g., send data to server
    // After submission:
    setIsSubmitting(false);
    setShowReviewModal(false);
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
      <div className="w-full flex justify-end mt-8 space-x-4">
        <button
          className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700"
          onClick={() => setShowReviewModal(true)}
        >
          Review & Submit Application
        </button>
        {/* Temporary button to access Medical History Page */}
        <button
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
          onClick={onNext}
          hidden
        >
          Go to Medical History
        </button>
      </div>

      <ReviewModalFormStudents
        show={showReviewModal}
        onClose={() => setShowReviewModal(false)}
        onSubmit={handleFinalSubmit}
        isSubmitting={isSubmitting}
        personalData={{
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
        }}
        transferee={transfereeData}
        healthHistory={{
          childhoodDiseases: "",
          allergies: "",
          otherMedicalConditions: "",
          immunizations: "",
          physicalHandicaps: "",
        }}
        fatherBackground={{
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
        }}
        motherBackground={{
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
        }}
        guardianBackground={{
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
        }}
        familyMembers={familyMembers}
        educationalBackground={educationalBackground}
      />
    </div>
  );
}
