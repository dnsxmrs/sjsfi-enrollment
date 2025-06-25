'use client';

import React, { useState } from 'react';

interface EditPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
  policyText: string;
  onSave: (updatedText: string) => void;
}

export default function EditPolicyModal({ isOpen, onClose, policyText, onSave }: EditPolicyModalProps) {
  const [text, setText] = useState(policyText);


  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-600/50 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6">
        <h2 className="text-xl font-semibold text-center text-gray-800">Edit General Policy</h2>
        <p className="text-center text-sm text-gray-500 mb-4">
          Edit the policy details below. These changes will apply across the system.
        </p>
        <textarea
          className="w-full h-40 border border-red-400 rounded p-3 text-sm text-gray-700"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="mt-6 flex justify-center gap-6">
          <button
            onClick={onClose}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onSave(text);
              onClose();
            }}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
