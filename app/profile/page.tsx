"use client";

import { useState } from "react";
import ProfileCard from "@/components/ProfileCard";
import OrderHistory from "@/components/OrderHistory";
import { mockUser } from "@/lib/mockData";
import { UserProfile } from "@/types/user";

export default function ProfilePage() {
  const [user, setUser] = useState<UserProfile>(mockUser);

  const handleUpdate = (updated: Partial<UserProfile>) => {
    setUser((prev) => ({ ...prev, ...updated }));
  };

  return (
    <main className="min-h-screen py-10 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800">الملف الشخصي</h1>
          <p className="text-gray-500 text-sm mt-1">
            إدارة معلوماتك الشخصية وسجل طلباتك
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: "إجمالي الطلبات", value: user.orders.length },
            {
              label: "طلبات مكتملة",
              value: user.orders.filter((o) => o.status === "delivered").length,
            },
            {
              label: "قيد التنفيذ",
              value: user.orders.filter((o) => o.status === "processing")
                .length,
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-white rounded-xl shadow-sm border border-amber-100 p-4 text-center"
            >
              <p className="text-2xl font-bold text-amber-700">{stat.value}</p>
              <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="md:col-span-1">
            <ProfileCard user={user} onUpdate={handleUpdate} />
          </div>

          {/* Order History */}
          <div className="md:col-span-2">
            <OrderHistory orders={user.orders} />
          </div>
        </div>
      </div>
    </main>
  );
}
