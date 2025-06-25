'use client'

import React, { useState } from 'react';

const StudentRegistrationForm: React.FC = () => {
  const [schoolYear, setSchoolYear] = useState('');
  const [schoolYearType, setSchoolYearType] = useState<'old' | 'new' | ''>('');
  const [gradeYearLevel, setGradeYearLevel] = useState('');
  const [studentNo, setStudentNo] = useState('');
  const [familyName, setFamilyName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [placeOfBirth, setPlaceOfBirth] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState<'female' | 'male' | ''>('');
  const [streetAddress, setStreetAddress] = useState('');
  const [city, setCity] = useState('');
  const [stateProvince, setStateProvince] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [parents, setParents] = useState([
    { familyName: '', firstName: '', middleName: '', occupation: '', relation: '' },
    { familyName: '', firstName: '', middleName: '', occupation: '', relation: '' },
  ]);
  const [contactNo, setContactNo] = useState('');
  const [modeOfPayment, setModeOfPayment] = useState('');
  const [amountPayable, setAmountPayable] = useState('');

  const handleParentChange = (index: number, field: string, value: string) => {
    const newParents = [...parents];
    newParents[index] = { ...newParents[index], [field]: value };
    setParents(newParents);
  };

  const handleAddContact = () => {
    // For now, no dynamic multiple contacts, just placeholder for plus button
    alert('Add contact functionality not implemented yet.');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    alert('Form submitted!');
  };

  return (
    <div className="w-full p-6 bg-white rounded-md shadow-md text-black">
      <h2 className="text-center font-bold text-lg mb-6 bg-gray-100 py-2 rounded">REGISTRATION FORM</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* School Year and Type */}

        <div className="flex flex-wrap items-center space-x-4 rounded p-2 m-2 me-2">
          <div className="flex flex-wrap items-center border border-gray-300 gap-7 p-4">
            <label className="flex items-center space-x-2 flex-grow min-w-[200px]">
              <span className="text-sm font-medium whitespace-nowrap">School Year:</span>
              <input
                type="text"
                placeholder="Answer Here..."
                value={schoolYear}
                onChange={(e) => setSchoolYear(e.target.value)}
                className="border border-gray-300 rounded px-2 py-1 flex-grow"
              />
            </label>

            <div className="flex items-center space-x-4 min-w-[150px]">
              <label className="flex items-center space-x-1 cursor-pointer">
                <input
                  type="radio"
                  name="schoolYearType"
                  value="old"
                  checked={schoolYearType === 'old'}
                  onChange={() => setSchoolYearType('old')}
                  className="accent-gray-400"
                />
                <span className="text-sm font-medium">Old</span>
              </label>
              <label className="flex items-center space-x-1 cursor-pointer">
                <input
                  type="radio"
                  name="schoolYearType"
                  value="new"
                  checked={schoolYearType === 'new'}
                  onChange={() => setSchoolYearType('new')}
                  className="accent-gray-400"
                />
                <span className="text-sm font-medium">New</span>
              </label>
            </div>
          </div>

          <label className="flex items-center space-x-2 flex-grow min-w-[200px]">
            <span className="w-32 text-sm font-medium">Grade Year/ Level:</span>
            <input
              type="text"
              placeholder="Answer Here..."
              value={gradeYearLevel}
              onChange={(e) => setGradeYearLevel(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1 flex-grow"
            />
          </label>

          <label className="flex items-center space-x-2 flex-grow min-w-[200px]">
            <span className="w-24 text-sm font-medium">Student No. :</span>
            <input
              type="text"
              placeholder="Answer Here..."
              value={studentNo}
              onChange={(e) => setStudentNo(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1 flex-grow"
            />
          </label>
        </div>

        {/* Names */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <label className="flex flex-col text-sm font-medium">
            Family Name
            <input
              type="text"
              placeholder="Answer Here..."
              value={familyName}
              onChange={(e) => setFamilyName(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1 mt-1"
            />
          </label>
          <label className="flex flex-col text-sm font-medium">
            First Name
            <input
              type="text"
              placeholder="Answer Here..."
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1 mt-1"
            />
          </label>
          <label className="flex flex-col text-sm font-medium">
            Middle Name
            <input
              type="text"
              placeholder="Answer Here..."
              value={middleName}
              onChange={(e) => setMiddleName(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1 mt-1"
            />
          </label>
        </div>

        {/* Birth Date, Place of Birth, Age, Gender */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-center">
          <label className="flex items-center space-x-2 w-full">
            <span className="w-28 text-sm font-medium">Birth Date</span>
            <input
              type="date"
              placeholder="MM/DD/YY"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1 flex-grow"
            />
          </label>
          <label className="flex items-center space-x-2 w-full">
            <span className="w-32 text-sm font-medium">Place of Birth:</span>
            <input
              type="text"
              placeholder="Answer Here..."
              value={placeOfBirth}
              onChange={(e) => setPlaceOfBirth(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1 flex-grow"
            />
          </label>
          <label className="flex items-center space-x-2 w-full">
            <span className="w-16 text-sm font-medium">Age:</span>
            <input
              type="text"
              placeholder="Answer Here..."
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1 flex-grow"
            />
          </label>
          
      <fieldset className="border border-gray-300 rounded p-4">
        <legend className="text-sm font-medium px-2">Sex:</legend>
            <div className="flex items-center space-x-4 justify-center w-full">
              <label className="flex items-center space-x-1 cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={gender === 'female'}
                  onChange={() => setGender('female')}
                  className="accent-gray-400"
                />
                <span className="text-sm font-medium">Female</span>
              </label>
              <label className="flex items-center space-x-1 cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={gender === 'male'}
                  onChange={() => setGender('male')}
                  className="accent-gray-400"
                />
                <span className="text-sm font-medium">Male</span>
              </label>
            </div>
          </fieldset>
        </div>
        

        {/* Address */}
        <fieldset className="border border-gray-300 rounded p-4">
          <legend className="text-sm font-medium px-2">Address:</legend>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mt-2">
            <label className="flex flex-col text-sm font-medium col-span-1 sm:col-span-1">
              Street Address:
              <input
                type="text"
                placeholder="Answer Here..."
                value={streetAddress}
                onChange={(e) => setStreetAddress(e.target.value)}
                className="border border-gray-300 rounded px-2 py-1 mt-1"
              />
            </label>
            <label className="flex flex-col text-sm font-medium col-span-1">
              City:
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="border border-gray-300 rounded px-2 py-1 mt-1"
              >
                <option value="">Answer Here...</option>
                <option value="City1">City1</option>
                <option value="City2">City2</option>
                <option value="City3">City3</option>
              </select>
            </label>
            <label className="flex flex-col text-sm font-medium col-span-1">
              State/ Province:
              <select
                value={stateProvince}
                onChange={(e) => setStateProvince(e.target.value)}
                className="border border-gray-300 rounded px-2 py-1 mt-1"
              >
                <option value="">Answer Here...</option>
                <option value="State1">State1</option>
                <option value="State2">State2</option>
                <option value="State3">State3</option>
              </select>
            </label>
            <label className="flex flex-col text-sm font-medium col-span-1">
              Zip/ Postal Code:
              <input
                type="text"
                placeholder="Answer Here..."
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                className="border border-gray-300 rounded px-2 py-1 mt-1"
              />
            </label>
          </div>
        </fieldset>

        {/* Parents/ Guardian */}
        <fieldset className="border border-gray-300 rounded p-4">
          <legend className="text-sm font-medium px-2">Parents/ Guardian:</legend>
          <div className="space-y-4 mt-2">
            {parents.map((parent, index) => (
              <div key={index} className="grid grid-cols-1 sm:grid-cols-5 gap-4">
                <label className="flex flex-col text-sm font-medium">
                  Family Name:
                  <input
                    type="text"
                    placeholder="Answer Here..."
                    value={parent.familyName}
                    onChange={(e) => handleParentChange(index, 'familyName', e.target.value)}
                    className="border border-gray-300 rounded px-2 py-1 mt-1"
                  />
                </label>
                <label className="flex flex-col text-sm font-medium">
                  First Name:
                  <input
                    type="text"
                    placeholder="Answer Here..."
                    value={parent.firstName}
                    onChange={(e) => handleParentChange(index, 'firstName', e.target.value)}
                    className="border border-gray-300 rounded px-2 py-1 mt-1"
                  />
                </label>
                <label className="flex flex-col text-sm font-medium">
                  Middle Name:
                  <input
                    type="text"
                    placeholder="Answer Here..."
                    value={parent.middleName}
                    onChange={(e) => handleParentChange(index, 'middleName', e.target.value)}
                    className="border border-gray-300 rounded px-2 py-1 mt-1"
                  />
                </label>
                <label className="flex flex-col text-sm font-medium">
                  Occupation:
                  <input
                    type="text"
                    placeholder="Answer Here..."
                    value={parent.occupation}
                    onChange={(e) => handleParentChange(index, 'occupation', e.target.value)}
                    className="border border-gray-300 rounded px-2 py-1 mt-1"
                  />
                </label>
                <label className="flex flex-col text-sm font-medium">
                  Relation to Student:
                  <input
                    type="text"
                    placeholder="Answer Here..."
                    value={parent.relation}
                    onChange={(e) => handleParentChange(index, 'relation', e.target.value)}
                    className="border border-gray-300 rounded px-2 py-1 mt-1"
                  />
                </label>
              </div>
            ))}
          </div>
        </fieldset>

        {/* Contact No. */}
        <div className="flex items-center space-x-2">
          <label className="flex items-center space-x-2 text-sm font-medium">
            Contact No.:
            <input
              type="text"
              placeholder="Answer Here..."
              value={contactNo}
              onChange={(e) => setContactNo(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1 ml-2 w-48"
            />
          </label>
          <button
            type="button"
            onClick={handleAddContact}
            className="border border-gray-400 rounded px-2 py-1 text-lg font-bold text-gray-600 hover:bg-gray-100"
            aria-label="Add contact"
          >
            +
          </button>
        </div>

        {/* Mode of Payment and Amount Payable */}
        <div className="flex items-center space-x-8 mt-4">
          <label className="flex flex-col text-sm font-medium w-64">
            Mode of Payment:
            <select
              value={modeOfPayment}
              onChange={(e) => setModeOfPayment(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1 mt-1"
            >
              <option value="">Answer Here...</option>
              <option value="cash">Cash</option>
              <option value="check">Check</option>
              <option value="online">Online</option>
            </select>
          </label>
          <label className="flex flex-col text-sm font-medium w-48">
            Amount Payable:
            <input
              type="text"
              placeholder="Answer Here..."
              value={amountPayable}
              onChange={(e) => setAmountPayable(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1 mt-1"
            />
          </label>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end mt-6">
          <button
            type="submit"
            className="bg-red-800 text-white px-6 py-2 rounded hover:bg-red-900 transition"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default StudentRegistrationForm;
