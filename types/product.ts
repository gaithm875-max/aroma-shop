// أنواع المنتجات والفئات
export interface Product {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  descriptionEn: string;
  price: number;
  image: string;
  category: 'men' | 'women' | 'unisex' | 'oriental' | 'french';
  status?: 'new' | 'featured' | 'bestseller';
  notes?: {
    top?: string[];
    middle?: string[];
    base?: string[];
  };
  inStock: boolean;
  // حقول جديدة للوحة التحكم
  quantity: number;
  discount: number;
  isDiscountActive: boolean;
  finalPrice: number;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  icon: string;
  slug: string;
}
