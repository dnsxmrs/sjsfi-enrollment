'use client';

import React from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  width?: string; // optional: default to "w-80"
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, width = 'w-80' }) => {
  if (!isOpen) return null;

  return (
    <div
        className="fixed inset-0 z-40 flex items-center justify-center bg-gray-600/50 backdrop-blur-sm"
        onClick={onClose}
    >

      <div
        className={`relative bg-white rounded-xl shadow-lg ${width}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <X className="w-5 h-5" />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
