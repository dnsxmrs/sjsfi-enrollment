'use client';

import { Plus, Edit } from "lucide-react";
import AddAcademicTermModal from '@/components/admin/AddAcademicTermModal';
import EditPolicyModal from '@/components/admin/EditPolicyModal';
import { useState } from "react";

export default function AcademicSettingsPage() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [policyText, setPolicyText] = useState(
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque fermentum, nisl at tristique venenatis, augue tellus fringilla neque, vel finibus risus massa at risus. Vestibulum feugiat ultricies odio et aliquam."
  );


  return (
    <div className="p-6 md:p-10">
      <AddAcademicTermModal isOpen={showAddModal} onClose={() => setShowAddModal(false)} />

      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-2/3 flex flex-col gap-6">
          {/* Academic Term Section */}
          <div className="bg-white border border-red-800 rounded-md p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Academic Term</h2>
              <button
                onClick={() => setShowAddModal(true)}
                className="bg-red-800 hover:bg-red-900 text-white px-4 py-2 rounded flex items-center gap-2 text-sm"
              >
                <Plus size={16} /> Add
              </button>
            </div>
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="text-gray-700">
                  <th className="px-3 py-2">ID</th>
                  <th className="px-3 py-2">Academic Term</th>
                  <th className="px-3 py-2">Status</th>
                  <th className="px-3 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr className="text-gray-700 hover:bg-gray-50">
                  <td className="px-3 py-2 border-t">4</td>
                  <td className="px-3 py-2 border-t">SY 2024–2025</td>
                  <td className="px-3 py-2 border-t">
                    <span className="bg-yellow-300 text-black px-2 py-1 text-xs rounded-full border-t">Ongoing</span>
                  </td>
                  <td className="px-3 py-2 text-sm  border-t">
                    <button className="mr-2 text-green-600 hover:underline">Finish</button>
                    <button className="hover:underline text-red-600">Delete</button>
                  </td>
                </tr>
                {[3, 2, 1].map((id) => (
                  <tr key={id} className="text-gray-700 hover:bg-gray-50">
                    <td className="px-3 py-2 border-t">{id}</td>
                    <td className="px-3 py-2 border-t">SY 202{5 - id}–202{4 - id}</td>
                    <td className="px-3 py-2 border-t">
                      <span className="bg-green-500 text-white px-2 py-1 text-xs rounded-full border-t">Done</span>
                    </td>
                    <td className="px-3 py-2 text-center text-gray-500 border-t">N/A</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* General Policy Section */}
          <div className="bg-white border border-red-800 rounded-md p-4">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-xl font-semibold text-gray-800">General Policy</h2>
              <button
                onClick={() => setShowEditModal(true)}
                className="bg-red-800 hover:bg-red-900 text-white px-4 py-2 rounded flex items-center gap-2 text-sm"
              >
                <Edit size={16} /> Edit
              </button>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed border border-red-300 rounded-md p-3 whitespace-pre-wrap break-words">
              {policyText}
            </p>
          </div>
        </div>

        {/* Right Column: Grading Scale */}
        <div className="bg-white md:w-1/3 flex flex-col gap-6">
          <div className="border border-red-800 rounded-md p-4 h-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Grading Scale</h2>
              <button className="bg-red-800 hover:bg-red-900 text-white px-4 py-2 rounded flex items-center gap-2 text-sm">
                <Plus size={16} /> Add
              </button>
            </div>
            <p className="text-sm text-gray-500 text-center pt-6">Nothing so far…</p>
          </div>
        </div>
      </div>

      <EditPolicyModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        policyText={policyText}
        onSave={(updatedText) => setPolicyText(updatedText)}
      />

    </div>
  );
}
