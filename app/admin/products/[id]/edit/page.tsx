'use client';

import { useState, useEffect, use } from 'react';
import { useProducts } from '@/hooks/useProducts';
import { useRouter } from 'next/navigation';
import { notFound } from 'next/navigation';
import ProductForm from '@/components/admin/ProductForm';
import ErrorToast from '@/components/admin/ErrorToast';
import { Product } from '@/types/product';
import { Check } from 'lucide-react';

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { getProductById, updateProduct } = useProducts();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [product, setProduct] = useState<Product | undefined>(undefined);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const foundProduct = getProductById(resolvedParams.id);
    setProduct(foundProduct);
  }, [resolvedParams.id, getProductById]);

  if (mounted && !product) {
    notFound();
  }

  if (!mounted || !product) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  const handleSubmit = (data: Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'finalPrice'>) => {
    setIsLoading(true);
    setError(null);

    try {
      updateProduct(resolvedParams.id, data);
      
      // عرض رسالة النجاح
      setShowSuccess(true);
      
      // الانتقال إلى صفحة المنتجات بعد ثانيتين
      setTimeout(() => {
        router.push('/admin/products');
      }, 2000);
    } catch (error) {
      console.error('Error updating product:', error);
      setError('حدث خطأ أثناء تحديث العطر. الرجاء المحاولة مرة أخرى.');
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    router.push('/admin/products');
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* رسالة النجاح */}
      {showSuccess && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 animate-slide-down">
          <div className="bg-green-500 text-white px-6 py-4 rounded-lg shadow-2xl flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-full">
              <Check className="w-6 h-6" />
            </div>
            <div>
              <p className="font-bold">تم تحديث العطر بنجاح!</p>
              <p className="text-sm text-green-100">جاري التحويل إلى قائمة المنتجات...</p>
            </div>
          </div>
        </div>
      )}

      {/* رسالة الخطأ */}
      {error && <ErrorToast message={error} onClose={() => setError(null)} />}

      {/* العنوان */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-navy-dark font-playfair mb-2">
          تعديل العطر
        </h1>
        <p className="text-gray-600">
          قم بتحديث معلومات العطر: <span className="font-semibold text-navy-dark">{product.name}</span>
        </p>
      </div>

      {/* النموذج */}
      <ProductForm
        initialData={product}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isEdit={true}
        isLoading={isLoading}
      />
    </div>
  );
}
