'use client';

import { useState } from 'react';
import { useProducts } from '@/hooks/useProducts';
import { useRouter } from 'next/navigation';
import ProductForm from '@/components/admin/ProductForm';
import { Product } from '@/types/product';
import { Check } from 'lucide-react';

export default function NewProductPage() {
  const { addProduct } = useProducts();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (data: Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'finalPrice'>) => {
    setIsLoading(true);

    try {
      addProduct(data);
      
      // عرض رسالة النجاح
      setShowSuccess(true);
      
      // الانتقال إلى صفحة المنتجات بعد ثانيتين
      setTimeout(() => {
        router.push('/admin/products');
      }, 2000);
    } catch (error) {
      console.error('Error adding product:', error);
      alert('حدث خطأ أثناء إضافة العطر. الرجاء المحاولة مرة أخرى.');
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
              <p className="font-bold">تم إضافة العطر بنجاح!</p>
              <p className="text-sm text-green-100">جاري التحويل إلى قائمة المنتجات...</p>
            </div>
          </div>
        </div>
      )}

      {/* العنوان */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-navy-dark font-playfair mb-2">
          إضافة عطر جديد
        </h1>
        <p className="text-gray-600">
          املأ جميع المعلومات المطلوبة لإضافة عطر جديد إلى المتجر
        </p>
      </div>

      {/* النموذج */}
      <ProductForm
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isLoading={isLoading}
      />
    </div>
  );
}
