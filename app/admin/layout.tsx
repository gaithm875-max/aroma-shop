'use client';

import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';
import { ProductProvider } from '@/contexts/ProductContext';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProductProvider>
      <div className="flex h-screen bg-gray-50 overflow-hidden" dir="rtl">
        {/* Sidebar */}
        <AdminSidebar />

        {/* المحتوى الرئيسي */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <AdminHeader />

          {/* محتوى الصفحة */}
          <main className="flex-1 overflow-y-auto p-6">
            {children}
          </main>
        </div>
      </div>
    </ProductProvider>
  );
}
