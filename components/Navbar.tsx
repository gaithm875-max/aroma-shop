'use client';

import { useState, useEffect } from 'react';
import { Menu, X, ShoppingCart, Search, User, Heart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { getCartCount } = useCart();
  const router = useRouter();
  const cartCount = getCartCount();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'الرئيسية', href: '#home' },
    { name: 'المتجر', href: '#shop' },
    { name: 'عنا', href: '#about' },
    { name: 'اتصل بنا', href: '#contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* الأيقونات على اليسار */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push('/cart')}
              className="relative p-2 hover:bg-cream rounded-full transition-luxury"
            >
              <ShoppingCart className="w-6 h-6 text-gold" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gold text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </button>
            <button className="p-2 hover:bg-cream rounded-full transition-luxury">
              <Search className="w-6 h-6 text-gold" />
            </button>
            <button className="p-2 hover:bg-cream rounded-full transition-luxury">
              <Heart className="w-6 h-6 text-gold" />
            </button>
            <button className="p-2 hover:bg-cream rounded-full transition-luxury">
              <User className="w-6 h-6 text-gold" />
            </button>
          </div>

          {/* اللوجو في الوسط */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <a href="#home" className="text-center">
              <h1 className="text-3xl font-bold text-gold font-playfair">
                Aroma
              </h1>
              <p className="text-xs text-brown tracking-widest">LUXURY PERFUMES</p>
            </a>
          </div>

          {/* الروابط على اليمين - Desktop */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-brown-dark hover:text-gold transition-luxury font-medium"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* زر القائمة - Mobile */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-gold" />
            ) : (
              <Menu className="w-6 h-6 text-gold" />
            )}
          </button>
        </div>

        {/* القائمة المنسدلة - Mobile */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-cream py-4 fade-in">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block px-4 py-3 text-brown-dark hover:bg-cream hover:text-gold transition-luxury"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
