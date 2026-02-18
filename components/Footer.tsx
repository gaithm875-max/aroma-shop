import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy-dark text-white">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* معلومات الشركة */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-gold font-playfair mb-4">
              Aroma Shop
            </h3>
            <p className="text-cream leading-relaxed">
              متجر العطور الفاخرة الأول في المنطقة. نقدم لكم أجود أنواع العطور الشرقية والفرنسية الأصيلة.
            </p>
            <div className="flex gap-4 pt-4">
              <a
                href="#"
                className="p-2 bg-gold/10 hover:bg-gold rounded-full transition-luxury"
              >
                <Facebook className="w-5 h-5 text-gold" />
              </a>
              <a
                href="#"
                className="p-2 bg-gold/10 hover:bg-gold rounded-full transition-luxury"
              >
                <Instagram className="w-5 h-5 text-gold" />
              </a>
              <a
                href="#"
                className="p-2 bg-gold/10 hover:bg-gold rounded-full transition-luxury"
              >
                <Twitter className="w-5 h-5 text-gold" />
              </a>
            </div>
          </div>

          {/* روابط سريعة */}
          <div>
            <h4 className="text-lg font-bold text-gold mb-4">روابط سريعة</h4>
            <ul className="space-y-3">
              <li>
                <a href="#home" className="text-cream hover:text-gold transition-luxury">
                  الرئيسية
                </a>
              </li>
              <li>
                <a href="#shop" className="text-cream hover:text-gold transition-luxury">
                  المتجر
                </a>
              </li>
              <li>
                <a href="#about" className="text-cream hover:text-gold transition-luxury">
                  من نحن
                </a>
              </li>
              <li>
                <a href="#contact" className="text-cream hover:text-gold transition-luxury">
                  اتصل بنا
                </a>
              </li>
            </ul>
          </div>

          {/* فئات المنتجات */}
          <div>
            <h4 className="text-lg font-bold text-gold mb-4">فئات المنتجات</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-cream hover:text-gold transition-luxury">
                  عطور رجالية
                </a>
              </li>
              <li>
                <a href="#" className="text-cream hover:text-gold transition-luxury">
                  عطور نسائية
                </a>
              </li>
              <li>
                <a href="#" className="text-cream hover:text-gold transition-luxury">
                  عطور للجنسين
                </a>
              </li>
              <li>
                <a href="#" className="text-cream hover:text-gold transition-luxury">
                  عطور شرقية
                </a>
              </li>
            </ul>
          </div>

          {/* معلومات الاتصال */}
          <div>
            <h4 className="text-lg font-bold text-gold mb-4">تواصل معنا</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-cream">
                <Phone className="w-5 h-5 text-gold" />
                <span>+966 50 123 4567</span>
              </li>
              <li className="flex items-center gap-3 text-cream">
                <Mail className="w-5 h-5 text-gold" />
                <span>info@aromashop.sa</span>
              </li>
              <li className="flex items-center gap-3 text-cream">
                <MapPin className="w-5 h-5 text-gold" />
                <span>الرياض، المملكة العربية السعودية</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-12 pt-8 border-t border-gold/20">
          <div className="max-w-md mx-auto text-center">
            <h4 className="text-lg font-bold text-gold mb-2">
              اشترك في نشرتنا البريدية
            </h4>
            <p className="text-cream text-sm mb-4">
              احصل على آخر العروض والمنتجات الجديدة
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="البريد الإلكتروني"
                className="flex-1 px-4 py-2 bg-white/10 border border-gold/30 rounded-lg text-white placeholder:text-cream/50 focus:outline-none focus:border-gold"
              />
              <button className="px-6 py-2 bg-gold hover:bg-gold-light text-white rounded-lg transition-luxury font-semibold">
                اشترك
              </button>
            </div>
          </div>
        </div>

        {/* حقوق النشر */}
        <div className="mt-12 pt-8 border-t border-gold/20 text-center text-cream text-sm">
          <p>
            © {currentYear} Aroma Shop. جميع الحقوق محفوظة.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
