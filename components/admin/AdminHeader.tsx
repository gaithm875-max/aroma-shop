'use client';

import { usePathname } from 'next/navigation';
import { Bell, LogOut, ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export default function AdminHeader() {
  const pathname = usePathname();

  // الحصول على عنوان الصفحة بناءً على المسار
  const getPageTitle = () => {
    if (pathname === '/admin') return 'لوحة التحكم';
    if (pathname === '/admin/products') return 'المنتجات';
    if (pathname === '/admin/products/new') return 'إضافة عطر جديد';
    if (pathname.includes('/admin/products/') && pathname.includes('/edit')) return 'تعديل العطر';
    if (pathname === '/admin/categories') return 'الفئات';
    if (pathname === '/admin/settings') return 'الإعدادات';
    return 'لوحة الإدارة';
  };

  // الحصول على Breadcrumbs
  const getBreadcrumbs = () => {
    const segments = pathname.split('/').filter(Boolean);
    const breadcrumbs = [
      { name: 'الرئيسية', href: '/admin' },
    ];

    if (segments[1] === 'products') {
      breadcrumbs.push({ name: 'المنتجات', href: '/admin/products' });
      
      if (segments[2] === 'new') {
        breadcrumbs.push({ name: 'إضافة جديد', href: '/admin/products/new' });
      } else if (segments[3] === 'edit') {
        breadcrumbs.push({ name: 'تعديل', href: pathname });
      }
    } else if (segments[1] === 'categories') {
      breadcrumbs.push({ name: 'الفئات', href: '/admin/categories' });
    } else if (segments[1] === 'settings') {
      breadcrumbs.push({ name: 'الإعدادات', href: '/admin/settings' });
    }

    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* العنوان و Breadcrumbs */}
          <div>
            <h1 className="text-2xl font-bold text-navy-dark font-playfair mb-1">
              {getPageTitle()}
            </h1>
            
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-2 text-sm">
              {breadcrumbs.map((crumb, index) => (
                <div key={crumb.href} className="flex items-center gap-2">
                  {index > 0 && <ChevronLeft className="w-4 h-4 text-gray-400" />}
                  <Link
                    href={crumb.href}
                    className={`
                      ${index === breadcrumbs.length - 1
                        ? 'text-gold font-semibold'
                        : 'text-gray-500 hover:text-gold transition-colors'
                      }
                    `}
                  >
                    {crumb.name}
                  </Link>
                </div>
              ))}
            </nav>
          </div>

          {/* الأيقونات والمستخدم */}
          <div className="flex items-center gap-4">
            {/* الإشعارات */}
            <button
              className="relative p-2 text-gray-500 hover:text-gold hover:bg-cream-light rounded-lg transition-colors"
              aria-label="الإشعارات"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* معلومات المستخدم */}
            <div className="flex items-center gap-3 px-4 py-2 bg-cream-light rounded-lg">
              <div className="text-right">
                <p className="text-sm font-semibold text-navy-dark">المدير العام</p>
                <p className="text-xs text-gray-500">admin@aromashop.com</p>
              </div>
              <div className="w-10 h-10 bg-gold rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">AD</span>
              </div>
            </div>

            {/* تسجيل الخروج */}
            <button
              className="p-2 text-red-500 hover:text-white hover:bg-red-500 rounded-lg transition-colors"
              aria-label="تسجيل الخروج"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
