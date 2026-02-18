'use client';

import { useState, useEffect, FormEvent } from 'react';
import { Product } from '@/types/product';
import { Save, X, AlertTriangle, Image as ImageIcon } from 'lucide-react';

interface ProductFormProps {
  initialData?: Product;
  onSubmit: (data: Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'finalPrice'>) => void;
  onCancel: () => void;
  isEdit?: boolean;
  isLoading?: boolean;
}

export default function ProductForm({
  initialData,
  onSubmit,
  onCancel,
  isEdit = false,
  isLoading = false,
}: ProductFormProps) {
  // State للنموذج
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    nameEn: initialData?.nameEn || '',
    description: initialData?.description || '',
    descriptionEn: initialData?.descriptionEn || '',
    price: initialData?.price || 0,
    image: initialData?.image || '',
    category: initialData?.category || 'men' as const,
    status: initialData?.status || 'new' as 'new' | 'featured' | 'bestseller',
    quantity: initialData?.quantity || 0,
    discount: initialData?.discount || 0,
    isDiscountActive: initialData?.isDiscountActive || false,
    inStock: initialData?.inStock ?? true,
    notes: {
      top: initialData?.notes?.top || [],
      middle: initialData?.notes?.middle || [],
      base: initialData?.notes?.base || [],
    },
  });

  // State للنوتات المؤقتة
  const [tempNotes, setTempNotes] = useState({
    top: '',
    middle: '',
    base: '',
  });

  // State للأخطاء
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // State لحالة تحميل الصورة
  const [imageError, setImageError] = useState(false);

  // إعادة تعيين حالة الخطأ عند تغيير رابط الصورة
  useEffect(() => {
    setImageError(false);
  }, [formData.image]);

  // حساب السعر النهائي
  const finalPrice = formData.isDiscountActive && formData.discount > 0
    ? formData.price - (formData.price * formData.discount / 100)
    : formData.price;

  // التحقق من صحة النموذج
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'الاسم العربي مطلوب';
    if (!formData.nameEn.trim()) newErrors.nameEn = 'الاسم الإنجليزي مطلوب';
    if (formData.price <= 0) newErrors.price = 'السعر يجب أن يكون أكبر من صفر';
    if (formData.quantity < 0) newErrors.quantity = 'الكمية يجب أن تكون صفر أو أكثر';
    if (formData.discount < 0 || formData.discount > 100) {
      newErrors.discount = 'نسبة الخصم يجب أن تكون بين 0 و 100';
    }
    if (!formData.image.trim()) newErrors.image = 'رابط الصورة مطلوب';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // معالجة الإرسال
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    onSubmit(formData);
  };

  // إضافة نوتة
  const addNote = (type: 'top' | 'middle' | 'base') => {
    const note = tempNotes[type].trim();
    if (note && !formData.notes[type].includes(note)) {
      setFormData(prev => ({
        ...prev,
        notes: {
          ...prev.notes,
          [type]: [...prev.notes[type], note],
        },
      }));
      setTempNotes(prev => ({ ...prev, [type]: '' }));
    }
  };

  // حذف نوتة
  const removeNote = (type: 'top' | 'middle' | 'base', index: number) => {
    setFormData(prev => ({
      ...prev,
      notes: {
        ...prev.notes,
        [type]: prev.notes[type].filter((_, i) => i !== index),
      },
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* المعلومات الأساسية */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-navy-dark mb-4 font-playfair">
          المعلومات الأساسية
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* الاسم العربي */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              الاسم العربي <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="مثال: عنبر ملكي"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name}</p>
            )}
          </div>

          {/* الاسم الإنجليزي */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              الاسم الإنجليزي <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.nameEn}
              onChange={(e) => setFormData(prev => ({ ...prev, nameEn: e.target.value }))}
              className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent ${
                errors.nameEn ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Example: Royal Amber"
            />
            {errors.nameEn && (
              <p className="mt-1 text-sm text-red-500">{errors.nameEn}</p>
            )}
          </div>

          {/* الوصف العربي */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              الوصف العربي
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={3}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent resize-none"
              placeholder="وصف تفصيلي للعطر بالعربية..."
            />
          </div>

          {/* الوصف الإنجليزي */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              الوصف الإنجليزي
            </label>
            <textarea
              value={formData.descriptionEn}
              onChange={(e) => setFormData(prev => ({ ...prev, descriptionEn: e.target.value }))}
              rows={3}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent resize-none"
              placeholder="Detailed description in English..."
            />
          </div>
        </div>
      </div>

      {/* التسعير */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-navy-dark mb-4 font-playfair">
          التسعير
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* السعر الأساسي */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              السعر الأساسي (ريال) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={formData.price}
              onChange={(e) => setFormData(prev => ({ ...prev, price: parseFloat(e.target.value) || 0 }))}
              className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent ${
                errors.price ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="499.00"
            />
            {errors.price && (
              <p className="mt-1 text-sm text-red-500">{errors.price}</p>
            )}
          </div>

          {/* نسبة الخصم */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              نسبة الخصم (%)
            </label>
            <input
              type="number"
              min="0"
              max="100"
              value={formData.discount}
              onChange={(e) => setFormData(prev => ({ ...prev, discount: parseFloat(e.target.value) || 0 }))}
              className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent ${
                errors.discount ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="10"
            />
            {errors.discount && (
              <p className="mt-1 text-sm text-red-500">{errors.discount}</p>
            )}
          </div>

          {/* تفعيل الخصم */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="isDiscountActive"
              checked={formData.isDiscountActive}
              onChange={(e) => setFormData(prev => ({ ...prev, isDiscountActive: e.target.checked }))}
              className="w-5 h-5 text-gold border-gray-300 rounded focus:ring-2 focus:ring-gold"
            />
            <label htmlFor="isDiscountActive" className="text-sm font-semibold text-gray-700">
              تفعيل الخصم
            </label>
          </div>

          {/* السعر النهائي */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              السعر النهائي (ريال)
            </label>
            <div className="px-4 py-2.5 bg-cream-light border border-gold rounded-lg">
              <span className="text-2xl font-bold text-gold font-playfair">
                {finalPrice.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* المخزون */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-navy-dark mb-4 font-playfair">
          المخزون
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* الكمية */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              الكمية المتوفرة <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              min="0"
              value={formData.quantity}
              onChange={(e) => setFormData(prev => ({ ...prev, quantity: parseInt(e.target.value) || 0 }))}
              className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent ${
                errors.quantity ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="50"
            />
            {errors.quantity && (
              <p className="mt-1 text-sm text-red-500">{errors.quantity}</p>
            )}
            
            {/* تحذير الكمية */}
            {formData.quantity === 0 && (
              <div className="mt-2 flex items-center gap-2 text-red-500 text-sm">
                <AlertTriangle className="w-4 h-4" />
                <span>نفذت الكمية</span>
              </div>
            )}
            {formData.quantity > 0 && formData.quantity < 10 && (
              <div className="mt-2 flex items-center gap-2 text-yellow-500 text-sm">
                <AlertTriangle className="w-4 h-4" />
                <span>كمية قليلة - يُنصح بإعادة التوريد</span>
              </div>
            )}
          </div>

          {/* متوفر في المخزون */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="inStock"
              checked={formData.inStock}
              onChange={(e) => setFormData(prev => ({ ...prev, inStock: e.target.checked }))}
              className="w-5 h-5 text-gold border-gray-300 rounded focus:ring-2 focus:ring-gold"
            />
            <label htmlFor="inStock" className="text-sm font-semibold text-gray-700">
              متوفر في المخزون
            </label>
          </div>
        </div>
      </div>

      {/* التصنيف */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-navy-dark mb-4 font-playfair">
          التصنيف
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* الفئة */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              الفئة <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData(prev => ({ 
                ...prev, 
                category: e.target.value as Product['category']
              }))}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
            >
              <option value="men">رجالي</option>
              <option value="women">نسائي</option>
              <option value="unisex">للجنسين</option>
              <option value="oriental">شرقي</option>
              <option value="french">فرنسي</option>
            </select>
          </div>

          {/* الحالة */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              الحالة
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData(prev => ({ 
                ...prev, 
                status: e.target.value as 'new' | 'featured' | 'bestseller'
              }))}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
            >
              <option value="new">جديد</option>
              <option value="featured">مميز</option>
              <option value="bestseller">الأكثر مبيعاً</option>
            </select>
          </div>
        </div>
      </div>

      {/* النوتات */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-navy-dark mb-4 font-playfair">
          النوتات العطرية
        </h2>

        <div className="space-y-6">
          {/* النوتات العليا */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              النوتات العليا (Top Notes)
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={tempNotes.top}
                onChange={(e) => setTempNotes(prev => ({ ...prev, top: e.target.value }))}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addNote('top'))}
                className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                placeholder="اضغط Enter للإضافة"
              />
              <button
                type="button"
                onClick={() => addNote('top')}
                className="px-6 py-2.5 bg-gold text-white font-semibold rounded-lg hover:bg-gold/90 transition-colors"
              >
                إضافة
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.notes.top.map((note, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-2 px-3 py-1.5 bg-gold/10 text-gold rounded-lg text-sm"
                >
                  {note}
                  <button
                    type="button"
                    onClick={() => removeNote('top', index)}
                    className="hover:text-red-500 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* النوتات الوسطى */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              النوتات الوسطى (Middle Notes)
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={tempNotes.middle}
                onChange={(e) => setTempNotes(prev => ({ ...prev, middle: e.target.value }))}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addNote('middle'))}
                className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                placeholder="اضغط Enter للإضافة"
              />
              <button
                type="button"
                onClick={() => addNote('middle')}
                className="px-6 py-2.5 bg-gold text-white font-semibold rounded-lg hover:bg-gold/90 transition-colors"
              >
                إضافة
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.notes.middle.map((note, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-2 px-3 py-1.5 bg-gold/10 text-gold rounded-lg text-sm"
                >
                  {note}
                  <button
                    type="button"
                    onClick={() => removeNote('middle', index)}
                    className="hover:text-red-500 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* النوتات القاعدية */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              النوتات القاعدية (Base Notes)
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={tempNotes.base}
                onChange={(e) => setTempNotes(prev => ({ ...prev, base: e.target.value }))}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addNote('base'))}
                className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                placeholder="اضغط Enter للإضافة"
              />
              <button
                type="button"
                onClick={() => addNote('base')}
                className="px-6 py-2.5 bg-gold text-white font-semibold rounded-lg hover:bg-gold/90 transition-colors"
              >
                إضافة
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.notes.base.map((note, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-2 px-3 py-1.5 bg-gold/10 text-gold rounded-lg text-sm"
                >
                  {note}
                  <button
                    type="button"
                    onClick={() => removeNote('base', index)}
                    className="hover:text-red-500 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* الصورة */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-navy-dark mb-4 font-playfair">
          الصورة
        </h2>

        <div className="space-y-4">
          {/* رابط الصورة */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              رابط الصورة <span className="text-red-500">*</span>
            </label>
            <input
              type="url"
              value={formData.image}
              onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
              className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent ${
                errors.image ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="https://example.com/image.jpg"
            />
            {errors.image && (
              <p className="mt-1 text-sm text-red-500">{errors.image}</p>
            )}
          </div>

          {/* معاينة الصورة */}
          {formData.image && (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
              <p className="text-sm font-semibold text-gray-700 mb-3">معاينة:</p>
              <div className="relative w-full h-64 bg-gray-100 rounded-lg overflow-hidden">
                {!imageError ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={formData.image}
                    alt="معاينة"
                    className="w-full h-full object-cover"
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-gray-400">
                    <ImageIcon className="w-16 h-16 mb-2" />
                    <p>فشل تحميل الصورة</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* الأزرار */}
      <div className="flex items-center justify-end gap-4 pt-6">
        <button
          type="button"
          onClick={onCancel}
          disabled={isLoading}
          className="px-8 py-3 border-2 border-navy-dark text-navy-dark font-semibold rounded-lg hover:bg-navy-dark hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          إلغاء
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="px-8 py-3 bg-gold text-white font-semibold rounded-lg hover:bg-gold/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>جاري الحفظ...</span>
            </>
          ) : (
            <>
              <Save className="w-5 h-5" />
              <span>{isEdit ? 'تحديث العطر' : 'إضافة العطر'}</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
