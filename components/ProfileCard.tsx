"use client";

import { useState } from "react";
import { UserProfile } from "@/types/user";

interface ProfileCardProps {
  user: UserProfile;
  onUpdate: (updated: Partial<UserProfile>) => void;
}

export default function ProfileCard({ user, onUpdate }: ProfileCardProps) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
    city: user.city,
  });

  const handleSave = () => {
    onUpdate(form);
    setEditing(false);
  };

  const handleCancel = () => {
    setForm({
      name: user.name,
      email: user.email,
      phone: user.phone,
      city: user.city,
    });
    setEditing(false);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-amber-100 p-6">
      {/* Avatar */}
      <div className="flex flex-col items-center mb-6">
        <div className="w-20 h-20 rounded-full bg-amber-700 flex items-center justify-center text-white text-2xl font-bold mb-3">
          {user.avatarInitials}
        </div>
        <h2 className="text-xl font-bold text-gray-800">{user.name}</h2>
        <p className="text-sm text-gray-500">عضو منذ {user.memberSince}</p>
      </div>

      {/* Profile Fields */}
      {editing ? (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              الاسم الكامل
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              البريد الإلكتروني
            </label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              رقم الجوال
            </label>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              المدينة
            </label>
            <input
              type="text"
              value={form.city}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
          <div className="flex gap-3 pt-2">
            <button
              onClick={handleSave}
              className="flex-1 bg-amber-700 text-white rounded-lg py-2 text-sm font-medium hover:bg-amber-800 transition-colors"
            >
              حفظ التغييرات
            </button>
            <button
              onClick={handleCancel}
              className="flex-1 border border-gray-300 text-gray-600 rounded-lg py-2 text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              إلغاء
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="flex items-center gap-3 py-2 border-b border-gray-100">
            <span className="text-gray-400 text-lg">✉️</span>
            <div>
              <p className="text-xs text-gray-500">البريد الإلكتروني</p>
              <p className="text-sm text-gray-800">{user.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 py-2 border-b border-gray-100">
            <span className="text-gray-400 text-lg">📱</span>
            <div>
              <p className="text-xs text-gray-500">رقم الجوال</p>
              <p className="text-sm text-gray-800">{user.phone}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 py-2 border-b border-gray-100">
            <span className="text-gray-400 text-lg">📍</span>
            <div>
              <p className="text-xs text-gray-500">المدينة</p>
              <p className="text-sm text-gray-800">{user.city}</p>
            </div>
          </div>
          <button
            onClick={() => setEditing(true)}
            className="w-full mt-4 border border-amber-300 text-amber-800 rounded-lg py-2 text-sm font-medium hover:bg-amber-50 transition-colors"
          >
            تعديل الملف الشخصي
          </button>
        </div>
      )}
    </div>
  );
}
