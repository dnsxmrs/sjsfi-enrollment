import React from "react";
import Image from "next/image";

export default function RegistrationFormPage() {
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
        <div className="w-full flex justify-center">
          <div className="rounded-md shadow px-8 py-2 font-bold text-lg tracking-wide border border-gray-200 bg-[#a10000] text-white">REGISTRATION FORM</div>
        </div>
      </div>

      {/* Form Card */}
      <form className="w-full max-w-6xl bg-white rounded-lg shadow p-8 flex flex-col gap-6 border border-gray-200">
        {/* Row 1: School Year, Old/New, Grade Level, Student No. */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1 text-black">School Year:</label>
            <input type="text" placeholder="Answer Here..." className="input input-bordered w-full text-black bg-gray-100 border border-gray-300" />
          </div>
          <div className="flex items-center gap-4 md:col-span-1">
            <label className="text-sm font-medium text-black">Old</label>
            <input type="radio" name="status" className="radio radio-sm text-black bg-gray-100 border border-gray-300" />
            <label className="text-sm font-medium ml-2 text-black">New</label>
            <input type="radio" name="status" className="radio radio-sm text-black bg-gray-100 border border-gray-300" />
          </div>
          <div className="md:col-span-1">
            <label className="block text-sm font-medium mb-1 text-black">Grade Year/ Level:</label>
            <input type="text" placeholder="Answer Here..." className="input input-bordered w-full text-black bg-gray-100 border border-gray-300" />
          </div>
          <div className="md:col-span-1">
            <label className="block text-sm font-medium mb-1 text-black">Student No. :</label>
            <input type="text" placeholder="Answer Here..." className="input input-bordered w-full text-black bg-gray-100 border border-gray-300" />
          </div>
        </div>

        {/* Row 2: Name Fields */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-black">Family Name</label>
            <input type="text" placeholder="Answer Here..." className="input input-bordered w-full text-black bg-gray-100 border border-gray-300" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-black">First Name</label>
            <input type="text" placeholder="Answer Here..." className="input input-bordered w-full text-black bg-gray-100 border border-gray-300" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-black">Middle Name</label>
            <input type="text" placeholder="Answer Here..." className="input input-bordered w-full text-black bg-gray-100 border border-gray-300" />
          </div>
        </div>

        {/* Row 3: Birth, Place, Age, Gender */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-end">
          <div className="md:col-span-1">
            <label className="block text-sm font-medium mb-1 text-black">Birth Date:</label>
            <input type="date" className="input input-bordered w-full text-black bg-gray-100 border border-gray-300" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1 text-black">Place of Birth:</label>
            <input type="text" placeholder="Answer Here..." className="input input-bordered w-full text-black bg-gray-100 border border-gray-300" />
          </div>
          <div className="md:col-span-1">
            <label className="block text-sm font-medium mb-1 text-black">Age:</label>
            <input type="text" placeholder="Answer Here..." className="input input-bordered w-full text-black bg-gray-100 border border-gray-300" />
          </div>
          <div className="md:col-span-2 flex items-center gap-4 mt-6 md:mt-0">
            <label className="text-sm font-medium text-black">Female</label>
            <input type="radio" name="gender" className="radio radio-sm text-black bg-gray-100 border border-gray-300" />
            <label className="text-sm font-medium ml-2 text-black">Male</label>
            <input type="radio" name="gender" className="radio radio-sm text-black bg-gray-100 border border-gray-300" />
          </div>
        </div>

        {/* Row 4: Address */}
        <div>
          <label className="block text-sm font-medium mb-1 text-black">Address:</label>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <input type="text" placeholder="Street Address..." className="input input-bordered w-full text-black bg-gray-100 border border-gray-300" />
            </div>
            <div>
              <input type="text" placeholder="City..." className="input input-bordered w-full text-black bg-gray-100 border border-gray-300" />
            </div>
            <div>
              <input type="text" placeholder="State/ Province..." className="input input-bordered w-full text-black bg-gray-100 border border-gray-300" />
            </div>
            <div>
              <input type="text" placeholder="Zip/ Postal Code..." className="input input-bordered w-full text-black bg-gray-100 border border-gray-300" />
            </div>
          </div>
        </div>

        {/* Row 5: Parents/Guardian */}
        <div>
          <label className="block text-sm font-medium mb-1 text-black">Parents/ Guardian:</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
            {/* Parent 1 */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
              <input type="text" placeholder="Family Name..." className="input input-bordered w-full text-black bg-gray-100 border border-gray-300" />
              <input type="text" placeholder="First Name..." className="input input-bordered w-full text-black bg-gray-100 border border-gray-300" />
              <input type="text" placeholder="Middle Name..." className="input input-bordered w-full text-black bg-gray-100 border border-gray-300" />
              <input type="text" placeholder="Occupation..." className="input input-bordered w-full text-black bg-gray-100 border border-gray-300" />
            </div>
            <input type="text" placeholder="Relation to Student..." className="input input-bordered w-full text-black bg-gray-100 border border-gray-300" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Parent 2 */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
              <input type="text" placeholder="Family Name..." className="input input-bordered w-full text-black bg-gray-100 border border-gray-300" />
              <input type="text" placeholder="First Name..." className="input input-bordered w-full text-black bg-gray-100 border border-gray-300" />
              <input type="text" placeholder="Middle Name..." className="input input-bordered w-full text-black bg-gray-100 border border-gray-300" />
              <input type="text" placeholder="Occupation..." className="input input-bordered w-full text-black bg-gray-100 border border-gray-300" />
            </div>
            <input type="text" placeholder="Relation to Student..." className="input input-bordered w-full text-black bg-gray-100 border border-gray-300" />
          </div>
        </div>

        {/* Row 6: Contact, Payment */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div className="flex items-center gap-2">
            <label className="block text-sm font-medium mb-1 text-black">Contact No.:</label>
            <input type="text" placeholder="Answer Here..." className="input input-bordered w-full text-black bg-gray-100 border border-gray-300" />
            <button type="button" className="btn btn-sm btn-outline text-black bg-gray-100 border border-gray-300"><span className="text-lg font-bold">+</span></button>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-black">Mode of Payment:</label>
            <select className="input input-bordered w-full text-black bg-gray-100 border border-gray-300">
              <option>Answer Here...</option>
              <option>Cash</option>
              <option>Installment</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-black">Amount Payable:</label>
            <input type="text" placeholder="Answer Here..." className="input input-bordered w-full text-black bg-gray-100 border border-gray-300" />
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end mt-4">
          <button type="submit" className="bg-[#a10000] text-white px-8 py-2 rounded-md font-semibold text-lg shadow hover:bg-[#7a0000] transition">Submit</button>
        </div>
      </form>
    </div>
  );
}
