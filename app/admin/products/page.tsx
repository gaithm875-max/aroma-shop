'use client';

import { useState } from 'react';
import { useProducts } from '@/hooks/useProducts';
import { useRouter } from 'next/navigation';
import DeleteConfirmModal from '@/components/admin/DeleteConfirmModal';
import { Plus, Search, Edit, Trash2, AlertTriangle, Filter } from 'lucide-react';
import Link from 'next/link';

export default function ProductsListPage() {
  const { products, deleteProduct, isLoading } = useProducts();
  const router = useRouter();

  // State للبحث والفلترة
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [stockFilter, setStockFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('newest');

  // State للـ Modal
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<{ id: string; name: string } | null>(null);

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

  // تصفية المنتجات
  let filteredProducts = products.filter(product => {
    // البحث
    const matchesSearch = 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.nameEn.toLowerCase().includes(searchQuery.toLowerCase());

    // الفئة
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;

    // الحالة
    const matchesStatus = statusFilter === 'all' || product.status === statusFilter;

    // المخزون
    let matchesStock = true;
    if (stockFilter === 'available') matchesStock = product.quantity >= 10;
    else if (stockFilter === 'low') matchesStock = product.quantity > 0 && product.quantity < 10;
    else if (stockFilter === 'out') matchesStock = product.quantity === 0;

    return matchesSearch && matchesCategory && matchesStatus && matchesStock;
  });

  // ترتيب المنتجات
  filteredProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'name':
        return a.name.localeCompare(b.name, 'ar');
      case 'price-low':
        return a.finalPrice - b.finalPrice;
      case 'price-high':
        return b.finalPrice - a.finalPrice;
      case 'quantity-low':
        return a.quantity - b.quantity;
      case 'quantity-high':
        return b.quantity - a.quantity;
      default:
        return 0;
    }
  });

  // فتح modal الحذف
  const handleDeleteClick = (id: string, name: string) => {
    setProductToDelete({ id, name });
    setDeleteModalOpen(true);
  };

  // تأكيد الحذف
  const handleDeleteConfirm = () => {
    if (productToDelete) {
      deleteProduct(productToDelete.id);
      setDeleteModalOpen(false);
      setProductToDelete(null);
    }
  };

  // الحصول على badge الكمية
  const getStockBadge = (quantity: number) => {
    if (quantity === 0) {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-1 bg-red-100 text-red-600 text-xs font-semibold rounded">
          <AlertTriangle className="w-3 h-3" />
          نفذت
        </span>
      );
    } else if (quantity < 10) {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-1 bg-yellow-100 text-yellow-600 text-xs font-semibold rounded">
          <AlertTriangle className="w-3 h-3" />
          قليلة
        </span>
      );
    }
    return (
      <span className="px-2 py-1 bg-green-100 text-green-600 text-xs font-semibold rounded">
        متوفر
      </span>
    );
  };

  // الحصول على badge الحالة
  const getStatusBadge = (status?: string) => {
    switch (status) {
      case 'new':
        return <span className="px-2 py-1 bg-blue-100 text-blue-600 text-xs font-semibold rounded">جديد</span>;
      case 'featured':
        return <span className="px-2 py-1 bg-purple-100 text-purple-600 text-xs font-semibold rounded">مميز</span>;
      case 'bestseller':
        return <span className="px-2 py-1 bg-green-100 text-green-600 text-xs font-semibold rounded">الأكثر مبيعاً</span>;
      default:
        return null;
    }
  };

  // الحصول على اسم الفئة
  const getCategoryName = (category: string) => {
    const categories: Record<string, string> = {
      men: 'رجالي',
      women: 'نسائي',
      unisex: 'للجنسين',
      oriental: 'شرقي',
      french: 'فرنسي',
    };
    return categories[category] || category;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-navy-dark font-playfair">
            إدارة المنتجات
          </h1>
          <p className="text-gray-600 mt-1">
            {filteredProducts.length} من {products.length} منتج
          </p>
        </div>
        <Link
          href="/admin/products/new"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gold text-white font-semibold rounded-lg hover:bg-gold/90 transition-colors shadow-md"
        >
          <Plus className="w-5 h-5" />
          <span>إضافة عطر جديد</span>
        </Link>
      </div>

      {/* البحث والفلترة */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* البحث */}
          <div className="lg:col-span-2">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ابحث بالاسم العربي أو الإنجليزي..."
                className="w-full pr-10 pl-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
              />
            </div>
          </div>

          {/* الفئة */}
          <div>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
            >
              <option value="all">جميع الفئات</option>
              <option value="men">رجالي</option>
              <option value="women">نسائي</option>
              <option value="unisex">للجنسين</option>
              <option value="oriental">شرقي</option>
              <option value="french">فرنسي</option>
            </select>
          </div>

          {/* الحالة */}
          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
            >
              <option value="all">جميع الحالات</option>
              <option value="new">جديد</option>
              <option value="featured">مميز</option>
              <option value="bestseller">الأكثر مبيعاً</option>
            </select>
          </div>

          {/* المخزون */}
          <div>
            <select
              value={stockFilter}
              onChange={(e) => setStockFilter(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
            >
              <option value="all">كل المخزون</option>
              <option value="available">متوفر</option>
              <option value="low">قليل</option>
              <option value="out">نفذ</option>
            </select>
          </div>
        </div>

        {/* الترتيب */}
        <div className="mt-4 flex items-center gap-3">
          <Filter className="w-5 h-5 text-gray-500" />
          <span className="text-sm font-semibold text-gray-700">ترتيب حسب:</span>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSortBy('newest')}
              className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                sortBy === 'newest'
                  ? 'bg-gold text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              الأحدث
            </button>
            <button
              onClick={() => setSortBy('name')}
              className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                sortBy === 'name'
                  ? 'bg-gold text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              الاسم
            </button>
            <button
              onClick={() => setSortBy('price-low')}
              className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                sortBy === 'price-low'
                  ? 'bg-gold text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              السعر: منخفض-عالي
            </button>
            <button
              onClick={() => setSortBy('price-high')}
              className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                sortBy === 'price-high'
                  ? 'bg-gold text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              السعر: عالي-منخفض
            </button>
            <button
              onClick={() => setSortBy('quantity-low')}
              className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                sortBy === 'quantity-low'
                  ? 'bg-gold text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              الكمية: قليل
            </button>
          </div>
        </div>
      </div>

      {/* الجدول - Desktop */}
      <div className="hidden lg:block bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-navy-dark text-white">
              <tr>
                <th className="px-6 py-4 text-right text-sm font-semibold">الصورة</th>
                <th className="px-6 py-4 text-right text-sm font-semibold">الاسم</th>
                <th className="px-6 py-4 text-right text-sm font-semibold">الفئة</th>
                <th className="px-6 py-4 text-right text-sm font-semibold">السعر</th>
                <th className="px-6 py-4 text-right text-sm font-semibold">الخصم</th>
                <th className="px-6 py-4 text-right text-sm font-semibold">السعر النهائي</th>
                <th className="px-6 py-4 text-right text-sm font-semibold">الكمية</th>
                <th className="px-6 py-4 text-right text-sm font-semibold">الحالة</th>
                <th className="px-6 py-4 text-right text-sm font-semibold">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-cream-light transition-colors">
                  <td className="px-6 py-4">
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-semibold text-navy-dark">{product.name}</p>
                      <p className="text-sm text-gray-500">{product.nameEn}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-700">
                      {getCategoryName(product.category)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-semibold text-gray-700">
                      {product.price.toFixed(0)} ر.س
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {product.isDiscountActive && product.discount > 0 ? (
                      <span className="px-2 py-1 bg-red-100 text-red-600 text-xs font-semibold rounded">
                        {product.discount}%
                      </span>
                    ) : (
                      <span className="text-sm text-gray-400">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-lg font-bold text-gold font-playfair">
                      {product.finalPrice.toFixed(0)} ر.س
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      <span className="text-sm font-semibold text-gray-700">
                        {product.quantity}
                      </span>
                      {getStockBadge(product.quantity)}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(product.status)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/admin/products/${product.id}/edit`}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="تعديل"
                      >
                        <Edit className="w-5 h-5" />
                      </Link>
                      <button
                        onClick={() => handleDeleteClick(product.id, product.name)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="حذف"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">لا توجد منتجات تطابق البحث</p>
          </div>
        )}
      </div>

      {/* البطاقات - Mobile */}
      <div className="lg:hidden space-y-4">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md p-4">
            <div className="flex gap-4 mb-4">
              <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-navy-dark truncate">{product.name}</h3>
                <p className="text-sm text-gray-500 truncate">{product.nameEn}</p>
                <div className="flex items-center gap-2 mt-2">
                  {getStatusBadge(product.status)}
                  {getStockBadge(product.quantity)}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
              <div>
                <span className="text-gray-500">الفئة:</span>
                <span className="font-semibold text-gray-700 mr-1">
                  {getCategoryName(product.category)}
                </span>
              </div>
              <div>
                <span className="text-gray-500">الكمية:</span>
                <span className="font-semibold text-gray-700 mr-1">
                  {product.quantity}
                </span>
              </div>
              <div>
                <span className="text-gray-500">السعر:</span>
                <span className="font-semibold text-gray-700 mr-1">
                  {product.price.toFixed(0)} ر.س
                </span>
              </div>
              <div>
                <span className="text-gray-500">السعر النهائي:</span>
                <span className="font-bold text-gold mr-1">
                  {product.finalPrice.toFixed(0)} ر.س
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-4 border-t border-gray-200">
              <Link
                href={`/admin/products/${product.id}/edit`}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 font-semibold rounded-lg hover:bg-blue-100 transition-colors"
              >
                <Edit className="w-4 h-4" />
                <span>تعديل</span>
              </Link>
              <button
                onClick={() => handleDeleteClick(product.id, product.name)}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-50 text-red-600 font-semibold rounded-lg hover:bg-red-100 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                <span>حذف</span>
              </button>
            </div>
          </div>
        ))}

        {filteredProducts.length === 0 && (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <p className="text-gray-500">لا توجد منتجات تطابق البحث</p>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        productName={productToDelete?.name || ''}
      />
    </div>
  );
}
