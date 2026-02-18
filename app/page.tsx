import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ProductCard from '@/components/ProductCard';
import CategoryCard from '@/components/CategoryCard';
import Footer from '@/components/Footer';
import { products } from '@/lib/products';
import { categories } from '@/lib/categories';
import { Truck, Shield, Award, HeadphonesIcon } from 'lucide-react';

export default function Home() {
  // الحصول على المنتجات المميزة (أول 6 منتجات)
  const featuredProducts = products.filter(p => p.status === 'featured').slice(0, 6);
  // إذا لم يكن هناك منتجات مميزة كافية، نأخذ من بقية المنتجات
  const displayProducts = featuredProducts.length >= 6 
    ? featuredProducts 
    : products.slice(0, 6);

  return (
    <main className="min-h-screen">
      <Navbar />
      
      <Hero />

      {/* قسم العطور المميزة */}
      <section id="shop" className="section-spacing bg-cream-light">
        <div className="container-custom">
          {/* العنوان */}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-navy-dark mb-4 font-playfair">
              عطورنا المميزة
            </h2>
            <div className="w-24 h-1 bg-gold mx-auto mb-4" />
            <p className="text-brown text-lg max-w-2xl mx-auto">
              اكتشف مجموعتنا المختارة بعناية من أرقى العطور الفاخرة
            </p>
          </div>

          {/* شبكة المنتجات */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* زر عرض المزيد */}
          <div className="text-center mt-12">
            <button className="btn-primary">
              عرض جميع المنتجات
            </button>
          </div>
        </div>
      </section>

      {/* قسم الفئات */}
      <section className="section-spacing bg-white">
        <div className="container-custom">
          {/* العنوان */}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-navy-dark mb-4 font-playfair">
              تصفح حسب الفئة
            </h2>
            <div className="w-24 h-1 bg-gold mx-auto mb-4" />
            <p className="text-brown text-lg max-w-2xl mx-auto">
              اختر من بين مجموعة واسعة من الفئات لتجد العطر المثالي لك
            </p>
          </div>

          {/* شبكة الفئات */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* قسم "لماذا نحن" */}
      <section id="about" className="section-spacing bg-gradient-to-br from-navy-dark to-navy text-white">
        <div className="container-custom">
          {/* العنوان */}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 font-playfair">
              لماذا تختار Aroma Shop؟
            </h2>
            <div className="w-24 h-1 bg-gold mx-auto mb-4" />
            <p className="text-cream text-lg max-w-2xl mx-auto">
              نقدم لك تجربة تسوق استثنائية مع ضمان الجودة والأصالة
            </p>
          </div>

          {/* الميزات */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* شحن مجاني */}
            <div className="text-center group">
              <div className="inline-flex p-6 bg-gold/10 rounded-full mb-4 group-hover:bg-gold transition-all duration-300 group-hover:scale-110">
                <Truck className="w-12 h-12 text-gold group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-bold mb-2 font-playfair">شحن مجاني</h3>
              <p className="text-cream">
                شحن مجاني لجميع الطلبات فوق 300 ريال
              </p>
            </div>

            {/* ضمان الجودة */}
            <div className="text-center group">
              <div className="inline-flex p-6 bg-gold/10 rounded-full mb-4 group-hover:bg-gold transition-all duration-300 group-hover:scale-110">
                <Shield className="w-12 h-12 text-gold group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-bold mb-2 font-playfair">ضمان الأصالة</h3>
              <p className="text-cream">
                جميع منتجاتنا أصلية 100% مع ضمان الجودة
              </p>
            </div>

            {/* منتجات حصرية */}
            <div className="text-center group">
              <div className="inline-flex p-6 bg-gold/10 rounded-full mb-4 group-hover:bg-gold transition-all duration-300 group-hover:scale-110">
                <Award className="w-12 h-12 text-gold group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-bold mb-2 font-playfair">منتجات حصرية</h3>
              <p className="text-cream">
                عطور فاخرة حصرية من أرقى العلامات التجارية
              </p>
            </div>

            {/* دعم 24/7 */}
            <div className="text-center group">
              <div className="inline-flex p-6 bg-gold/10 rounded-full mb-4 group-hover:bg-gold transition-all duration-300 group-hover:scale-110">
                <HeadphonesIcon className="w-12 h-12 text-gold group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-bold mb-2 font-playfair">دعم 24/7</h3>
              <p className="text-cream">
                فريق دعم متاح على مدار الساعة لخدمتك
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* قسم Call to Action */}
      <section className="section-spacing bg-gradient-luxury">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-navy-dark mb-6 font-playfair">
              ابدأ رحلتك في عالم العطور الفاخرة
            </h2>
            <p className="text-brown text-lg mb-8 leading-relaxed">
              انضم إلى آلاف العملاء السعداء واكتشف عطرك المثالي اليوم
              <br />
              عروض حصرية وخصومات مميزة للعملاء الجدد
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary">
                ابدأ التسوق الآن
              </button>
              <button className="btn-secondary">
                اتصل بنا
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
