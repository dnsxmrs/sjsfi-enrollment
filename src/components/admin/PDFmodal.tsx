import React from 'react';

interface PDFmodalProps {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

const PDFmodal: React.FC<PDFmodalProps> = ({ isOpen, onCancel, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-600/50 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-sm p-6 text-center ">
        <h2 className="text-xl font-semibold mb-2 text-gray-600">Export as PDF</h2>
        <p className="mb-4 text-gray-600">Are you sure you want to export this as &apos;.pdf&apos;?</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onCancel}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default PDFmodal;