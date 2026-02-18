'use client';

import { X, AlertTriangle } from 'lucide-react';
import { useEffect } from 'react';

interface ErrorToastProps {
  message: string;
  onClose: () => void;
}

export default function ErrorToast({ message, onClose }: ErrorToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 animate-slide-down">
      <div className="bg-red-500 text-white px-6 py-4 rounded-lg shadow-2xl flex items-center gap-3 min-w-[300px]">
        <div className="p-2 bg-white/20 rounded-full">
          <AlertTriangle className="w-6 h-6" />
        </div>
        <div className="flex-1">
          <p className="font-bold">خطأ</p>
          <p className="text-sm text-red-100">{message}</p>
        </div>
        <button
          onClick={onClose}
          className="p-1 hover:bg-white/20 rounded transition-colors"
          aria-label="إغلاق"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
