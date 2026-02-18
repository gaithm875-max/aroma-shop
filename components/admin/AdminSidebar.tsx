'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Package, Tags, Settings, ChevronRight } from 'lucide-react';
import { useState } from 'react';

// عناصر القائمة الجانبية
const sidebarItems = [
  {
    name: 'لوحة التحكم',
    href: '/admin',
    icon: LayoutDashboard,
  },
  {
    name: 'المنتجات',
    href: '/admin/products',
    icon: Package,
  },
  {
    name: 'الفئات',
    href: '/admin/categories',
    icon: Tags,
  },
  {
    name: 'الإعدادات',
    href: '/admin/settings',
    icon: Settings,
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      {/* زر القائمة للموبايل */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 right-4 z-50 p-2 bg-navy-dark text-white rounded-lg shadow-lg"
        aria-label="Toggle menu"
      >
        <Package className="w-6 h-6" />
      </button>

      {/* Overlay للموبايل */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static top-0 right-0 h-screen w-64 bg-navy-dark text-white
          transition-transform duration-300 ease-in-out z-40
          ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Logo */}
        <div className="p-6 border-b border-gold/20">
          <Link href="/admin" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gold rounded-lg flex items-center justify-center">
              <Package className="w-6 h-6 text-navy-dark" />
            </div>
            <div>
              <h1 className="text-xl font-bold font-playfair">Aroma Shop</h1>
              <p className="text-xs text-gold">لوحة الإدارة</p>
            </div>
          </Link>
        </div>

        {/* قائمة التنقل */}
        <nav className="p-4 space-y-2">
          {sidebarItems.map((item) => {
            const isActive = pathname === item.href || 
                           (item.href !== '/admin' && pathname.startsWith(item.href));
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-lg transition-all
                  ${isActive 
                    ? 'bg-gold text-navy-dark font-semibold shadow-lg' 
                    : 'text-cream hover:bg-navy hover:text-gold'
                  }
                `}
              >
                <Icon className="w-5 h-5" />
                <span className="flex-1">{item.name}</span>
                {isActive && <ChevronRight className="w-4 h-4" />}
              </Link>
            );
          })}
        </nav>

        {/* معلومات إضافية */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gold/20">
          <div className="bg-navy rounded-lg p-3">
            <p className="text-xs text-cream mb-1">مرحباً بك</p>
            <p className="text-sm font-semibold text-gold">المدير العام</p>
          </div>
        </div>
      </aside>
    </>
  );
}
