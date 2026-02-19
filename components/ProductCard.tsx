'use client';

import Image from 'next/image';
import { Product } from '@/types/product';
import { ShoppingCart, Heart } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [showSuccess, setShowSuccess] = useState(false);
  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  const handleToggleWishlist = () => {
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <div className="card-luxury overflow-hidden group hover-lift">
      {/* صورة المنتج */}
      <div className="relative h-64 overflow-hidden bg-cream">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Badge للحالة */}
        {product.status && (
          <div className="absolute top-4 right-4 bg-gold text-white px-3 py-1 rounded-full text-xs font-semibold">
            {product.status === 'new' && 'جديد'}
            {product.status === 'featured' && 'مميز'}
            {product.status === 'bestseller' && 'الأكثر مبيعاً'}
          </div>
        )}

        {/* أيقونة القلب */}
        <button
          onClick={handleToggleWishlist}
          className={`absolute top-4 left-4 p-2 bg-white/90 rounded-full transition-luxury opacity-0 group-hover:opacity-100 hover:scale-110 ${
            inWishlist ? 'text-red-500' : 'hover:bg-gold hover:text-white'
          }`}
        >
          <Heart className="w-5 h-5" fill={inWishlist ? 'currentColor' : 'none'} />
        </button>
      </div>

      {/* تفاصيل المنتج */}
      <div className="p-6">
        {/* الفئة */}
        <span className="text-xs text-gold font-semibold uppercase tracking-wider">
          {product.category === 'men' && 'رجالي'}
          {product.category === 'women' && 'نسائي'}
          {product.category === 'unisex' && 'للجنسين'}
          {product.category === 'oriental' && 'شرقي'}
          {product.category === 'french' && 'فرنسي'}
        </span>

        {/* اسم العطر */}
        <h3 className="text-xl font-bold text-navy-dark mt-2 mb-2 font-playfair">
          {product.name}
        </h3>

        {/* الوصف */}
        <p className="text-brown text-sm leading-relaxed mb-4 line-clamp-2">
          {product.description}
        </p>

        {/* النوتات */}
        {product.notes && product.notes.top && (
          <div className="mb-4">
            <p className="text-xs text-brown/70 mb-1">النوتات العليا:</p>
            <p className="text-xs text-gold">
              {product.notes.top.join(' • ')}
            </p>
          </div>
        )}

        {/* السعر والزر */}
        <div className="flex items-center justify-between pt-4 border-t border-cream">
          <div>
            <p className="text-2xl font-bold text-navy-dark font-playfair">
              {product.price} ر.س
            </p>
          </div>
          <button
            onClick={handleAddToCart}
            className="bg-gold hover:bg-gold-light text-white p-3 rounded-full transition-luxury hover:scale-110 active:scale-95"
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>

        {/* رسالة النجاح */}
        {showSuccess && (
          <div
            role="status"
            aria-live="polite"
            className="mt-3 text-center bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium fade-in"
          >
            ✓ تم الإضافة للسلة!
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
