'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '@/types/product';
import { products as initialProducts } from '@/lib/products';

// نوع السياق
interface ProductContextType {
  products: Product[];
  addProduct: (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'finalPrice'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  getProductById: (id: string) => Product | undefined;
  isLoading: boolean;
}

// إنشاء السياق
const ProductContext = createContext<ProductContextType | undefined>(undefined);

// Provider Component
export function ProductProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // تحميل المنتجات من localStorage عند التحميل
  useEffect(() => {
    try {
      const storedProducts = localStorage.getItem('aroma-products');
      
      if (storedProducts) {
        setProducts(JSON.parse(storedProducts));
      } else {
        // إذا لم توجد بيانات، نستخدم البيانات الأولية
        setProducts(initialProducts);
        localStorage.setItem('aroma-products', JSON.stringify(initialProducts));
      }
    } catch (error) {
      console.error('Error loading products from localStorage:', error);
      setProducts(initialProducts);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // حفظ المنتجات في localStorage عند التحديث
  useEffect(() => {
    if (!isLoading && products.length > 0) {
      try {
        localStorage.setItem('aroma-products', JSON.stringify(products));
      } catch (error) {
        console.error('Error saving products to localStorage:', error);
      }
    }
  }, [products, isLoading]);

  // حساب السعر النهائي
  const calculateFinalPrice = (price: number, discount: number, isDiscountActive: boolean): number => {
    if (discount > 0 && isDiscountActive) {
      return price - (price * discount / 100);
    }
    return price;
  };

  // إضافة منتج جديد
  const addProduct = (productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'finalPrice'>) => {
    const now = new Date().toISOString();
    const newId = (Math.max(0, ...products.map(p => parseInt(p.id))) + 1).toString();
    
    const finalPrice = calculateFinalPrice(
      productData.price,
      productData.discount,
      productData.isDiscountActive
    );

    const newProduct: Product = {
      ...productData,
      id: newId,
      finalPrice,
      createdAt: now,
      updatedAt: now,
    };

    setProducts(prev => [...prev, newProduct]);
  };

  // تحديث منتج موجود
  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts(prev => prev.map(product => {
      if (product.id === id) {
        const updatedProduct = { ...product, ...updates };
        
        // إعادة حساب السعر النهائي إذا تغير السعر أو الخصم
        if ('price' in updates || 'discount' in updates || 'isDiscountActive' in updates) {
          updatedProduct.finalPrice = calculateFinalPrice(
            updatedProduct.price,
            updatedProduct.discount,
            updatedProduct.isDiscountActive
          );
        }
        
        updatedProduct.updatedAt = new Date().toISOString();
        return updatedProduct;
      }
      return product;
    }));
  };

  // حذف منتج
  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(product => product.id !== id));
  };

  // الحصول على منتج بواسطة المعرف
  const getProductById = (id: string): Product | undefined => {
    return products.find(product => product.id === id);
  };

  const value: ProductContextType = {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    getProductById,
    isLoading,
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
}

// Custom Hook للوصول إلى السياق
export function useProducts() {
  const context = useContext(ProductContext);
  
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  
  return context;
}
