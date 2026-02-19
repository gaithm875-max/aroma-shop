'use client';

import { useCart } from '@/contexts/CartContext';
import Image from 'next/image';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
  const router = useRouter();

  if (cartItems.length === 0) {
    return (
      <main className="min-h-screen">
        <Navbar />
        <div className="min-h-screen pt-32 pb-20 px-4 flex items-center justify-center">
          <div className="max-w-2xl mx-auto text-center">
            <ShoppingBag size={120} className="mx-auto text-gray-300 mb-8" />
            <h1 className="text-4xl font-playfair font-bold text-navy-dark mb-4">
              السلة فارغة
            </h1>
            <p className="text-xl text-brown mb-8">
              لم تقم بإضافة أي منتجات بعد
            </p>
            <button onClick={() => router.push('/')} className="btn-primary">
              تسوق الآن
            </button>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  const total = getCartTotal();
  const shipping = total > 300 ? 0 : 30;
  const finalTotal = total + shipping;

  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl font-playfair font-bold text-navy-dark mb-12">
            سلة التسوق
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map(item => (
                <div key={item.id} className="card-luxury p-6 flex gap-6">
                  {/* Image */}
                  <div className="relative w-32 h-32 flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-navy-dark mb-1 font-playfair">
                      {item.name}
                    </h3>
                    <p className="text-brown text-sm mb-4 line-clamp-2">
                      {item.description}
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.cartQuantity - 1)}
                          className="w-8 h-8 bg-cream hover:bg-gold hover:text-white rounded-full flex items-center justify-center transition-luxury"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="w-10 text-center font-bold text-navy-dark">
                          {item.cartQuantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.cartQuantity + 1)}
                          className="w-8 h-8 bg-cream hover:bg-gold hover:text-white rounded-full flex items-center justify-center transition-luxury"
                        >
                          <Plus size={16} />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-400 hover:text-red-600 transition-luxury"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gold font-playfair">
                      {(item.price * item.cartQuantity).toFixed(2)} ر.س
                    </div>
                    <div className="text-sm text-brown mt-1">
                      {item.price} ر.س × {item.cartQuantity}
                    </div>
                  </div>
                </div>
              ))}

              <button
                onClick={clearCart}
                className="text-red-400 hover:text-red-600 transition-luxury text-sm font-medium"
              >
                إفراغ السلة
              </button>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="card-luxury p-8 sticky top-24">
                <h2 className="text-2xl font-bold text-navy-dark mb-6 font-playfair">
                  ملخص الطلب
                </h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-brown">المجموع الفرعي:</span>
                    <span className="font-bold text-navy-dark">{total.toFixed(2)} ر.س</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-brown">الشحن:</span>
                    <span className="font-bold text-navy-dark">
                      {shipping === 0 ? 'مجاني' : `${shipping} ر.س`}
                    </span>
                  </div>
                  {shipping === 0 && (
                    <p className="text-sm text-green-600">✓ حصلت على شحن مجاني!</p>
                  )}
                  <div className="border-t border-cream pt-4 flex justify-between text-xl font-bold">
                    <span className="text-navy-dark">المجموع الكلي:</span>
                    <span className="text-gold">{finalTotal.toFixed(2)} ر.س</span>
                  </div>
                </div>

                <button className="btn-primary w-full mb-4">إتمام الطلب</button>
                <button
                  onClick={() => router.push('/')}
                  className="btn-secondary w-full"
                >
                  متابعة التسوق
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
