'use client';

import { useState, useEffect } from 'react';

// Custom hook لإدارة localStorage مع error handling
export function useLocalStorage<T>(key: string, initialValue: T) {
  // State للتخزين
  const [storedValue, setStoredValue] = useState<T>(initialValue);
  const [isLoading, setIsLoading] = useState(true);

  // قراءة القيمة من localStorage عند التحميل
  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        setStoredValue(JSON.parse(item));
      }
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
    } finally {
      setIsLoading(false);
    }
  }, [key]);

  // Function لحفظ القيمة في localStorage
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // إذا كانت القيمة function، نستخدمها مع القيمة الحالية
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      setStoredValue(valueToStore);
      
      // حفظ في localStorage
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  // Function لحذف القيمة من localStorage
  const removeValue = () => {
    try {
      setStoredValue(initialValue);
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(key);
      }
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue, removeValue, isLoading] as const;
}
