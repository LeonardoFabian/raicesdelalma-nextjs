"use client";

import { IoMdClose } from "react-icons/io";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Modal = ({ isOpen, onClose, children }: Props) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={handleOverlayClick}
    >
      <div className="relative bg-white rounded-2xl shadow-lg p-6 w-full max-w-md mx-4">
        <button
          className="absolute top-3 right-3 text-text-secondary hover:text-text-primary cursor-pointer transition"
          onClick={onClose}
        >
          <IoMdClose className="w-5 h-5" />
        </button>
        {children}
      </div>
    </div>
  );
};
