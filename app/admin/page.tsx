'use client';

import { useProducts } from '@/hooks/useProducts';
import StatsCard from '@/components/admin/StatsCard';
import { Package, Star, TrendingUp, Sparkles, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function AdminDashboard() {
  const { products, isLoading } = useProducts();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  // إحصائيات
  const totalProducts = products.length;
  const newProducts = products.filter(p => p.status === 'new').length;
  const featuredProducts = products.filter(p => p.status === 'featured').length;
  const bestsellers = products.filter(p => p.status === 'bestseller').length;
  const lowStockProducts = products.filter(p => p.quantity < 10 && p.quantity > 0);
  const outOfStockProducts = products.filter(p => p.quantity === 0);

  // إحصائيات حسب الفئة
  const categoryStats = {
    men: products.filter(p => p.category === 'men').length,
    women: products.filter(p => p.category === 'women').length,
    unisex: products.filter(p => p.category === 'unisex').length,
    oriental: products.filter(p => p.category === 'oriental').length,
    french: products.filter(p => p.category === 'french').length,
  };

  // آخر المنتجات المضافة
  const latestProducts = [...products]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  return (
    <div className="space-y-6">
      {/* الإحصائيات */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="إجمالي المنتجات"
          value={totalProducts}
          icon={Package}
          color="gold"
        />
        <StatsCard
          title="منتجات جديدة"
          value={newProducts}
          icon={Sparkles}
          color="blue"
        />
        <StatsCard
          title="منتجات مميزة"
          value={featuredProducts}
          icon={Star}
          color="purple"
        />
        <StatsCard
          title="الأكثر مبيعاً"
          value={bestsellers}
          icon={TrendingUp}
          color="green"
        />
      </div>

      {/* تحذيرات المخزون */}
      {(lowStockProducts.length > 0 || outOfStockProducts.length > 0) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {lowStockProducts.length > 0 && (
            <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <AlertTriangle className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-yellow-800 font-playfair">
                    منتجات قليلة الكمية
                  </h3>
                  <p className="text-sm text-yellow-600">
                    {lowStockProducts.length} منتج يحتاج إلى إعادة توريد
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                {lowStockProducts.slice(0, 3).map(product => (
                  <Link
                    key={product.id}
                    href={`/admin/products/${product.id}/edit`}
                    className="block p-3 bg-white rounded-lg hover:bg-yellow-50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-gray-700">
                        {product.name}
                      </span>
                      <span className="text-sm font-bold text-yellow-600">
                        الكمية: {product.quantity}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {outOfStockProducts.length > 0 && (
            <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-red-100 rounded-lg">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-red-800 font-playfair">
                    نفذت الكمية
                  </h3>
                  <p className="text-sm text-red-600">
                    {outOfStockProducts.length} منتج غير متوفر
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                {outOfStockProducts.slice(0, 3).map(product => (
                  <Link
                    key={product.id}
                    href={`/admin/products/${product.id}/edit`}
                    className="block p-3 bg-white rounded-lg hover:bg-red-50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-gray-700">
                        {product.name}
                      </span>
                      <span className="text-sm font-bold text-red-600">
                        نفذت الكمية
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* إحصائيات حسب الفئة */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-navy-dark mb-6 font-playfair">
            المنتجات حسب الفئة
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-700">رجالي</span>
              <div className="flex items-center gap-3">
                <div className="w-32 h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500"
                    style={{ width: `${(categoryStats.men / totalProducts) * 100}%` }}
                  />
                </div>
                <span className="text-sm font-bold text-blue-500 w-8 text-left">
                  {categoryStats.men}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-700">نسائي</span>
              <div className="flex items-center gap-3">
                <div className="w-32 h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-pink-500"
                    style={{ width: `${(categoryStats.women / totalProducts) * 100}%` }}
                  />
                </div>
                <span className="text-sm font-bold text-pink-500 w-8 text-left">
                  {categoryStats.women}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-700">للجنسين</span>
              <div className="flex items-center gap-3">
                <div className="w-32 h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-purple-500"
                    style={{ width: `${(categoryStats.unisex / totalProducts) * 100}%` }}
                  />
                </div>
                <span className="text-sm font-bold text-purple-500 w-8 text-left">
                  {categoryStats.unisex}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-700">شرقي</span>
              <div className="flex items-center gap-3">
                <div className="w-32 h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-600"
                    style={{ width: `${(categoryStats.oriental / totalProducts) * 100}%` }}
                  />
                </div>
                <span className="text-sm font-bold text-amber-600 w-8 text-left">
                  {categoryStats.oriental}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-700">فرنسي</span>
              <div className="flex items-center gap-3">
                <div className="w-32 h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-indigo-500"
                    style={{ width: `${(categoryStats.french / totalProducts) * 100}%` }}
                  />
                </div>
                <span className="text-sm font-bold text-indigo-500 w-8 text-left">
                  {categoryStats.french}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* آخر المنتجات المضافة */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-navy-dark font-playfair">
              آخر المنتجات المضافة
            </h2>
            <Link
              href="/admin/products"
              className="text-sm text-gold hover:text-gold/80 font-semibold"
            >
              عرض الكل ←
            </Link>
          </div>
          <div className="space-y-3">
            {latestProducts.map(product => (
              <Link
                key={product.id}
                href={`/admin/products/${product.id}/edit`}
                className="flex items-center gap-4 p-3 rounded-lg hover:bg-cream-light transition-colors"
              >
                <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-navy-dark truncate">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm text-gray-500">
                      {new Date(product.createdAt).toLocaleDateString('ar-SA', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </span>
                    {product.status === 'new' && (
                      <span className="px-2 py-0.5 bg-blue-100 text-blue-600 text-xs font-semibold rounded">
                        جديد
                      </span>
                    )}
                    {product.status === 'featured' && (
                      <span className="px-2 py-0.5 bg-purple-100 text-purple-600 text-xs font-semibold rounded">
                        مميز
                      </span>
                    )}
                  </div>
                </div>
                <div className="text-left">
                  <p className="text-lg font-bold text-gold font-playfair">
                    {product.finalPrice.toFixed(0)} ر.س
                  </p>
                  {product.isDiscountActive && product.discount > 0 && (
                    <p className="text-xs text-gray-400 line-through">
                      {product.price.toFixed(0)} ر.س
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* رابط سريع لإضافة منتج */}
      <div className="bg-gradient-to-br from-gold to-amber-600 rounded-lg shadow-lg p-8 text-center">
        <h3 className="text-2xl font-bold text-white mb-3 font-playfair">
          هل لديك عطر جديد لإضافته؟
        </h3>
        <p className="text-cream mb-6">
          قم بإضافة عطور جديدة إلى المتجر بسهولة وسرعة
        </p>
        <Link
          href="/admin/products/new"
          className="inline-flex items-center gap-2 px-8 py-3 bg-white text-gold font-bold rounded-lg hover:bg-cream transition-colors shadow-lg"
        >
          <Package className="w-5 h-5" />
          <span>إضافة عطر جديد</span>
        </Link>
      </div>
    </div>
  );
}
