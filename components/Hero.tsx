import { ArrowLeft, Sparkles } from 'lucide-react';

const Hero = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1595425970154-c78f9d99be58?w=1920&q=80)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-dark/80 via-navy-dark/60 to-navy-dark/80" />

      {/* المحتوى */}
      <div className="relative z-10 container-custom text-center text-white py-20">
        {/* أيقونة التألق */}
        <div className="flex justify-center mb-6 fade-in">
          <div className="p-4 bg-gold/20 rounded-full backdrop-blur-sm">
            <Sparkles className="w-8 h-8 text-gold" />
          </div>
        </div>

        {/* العنوان الرئيسي */}
        <h1 className="text-5xl md:text-7xl font-bold mb-6 font-playfair fade-in">
          <span className="gradient-text">Aroma Shop</span>
        </h1>

        {/* العنوان الفرعي */}
        <h2 className="text-2xl md:text-4xl font-light mb-4 fade-in">
          عالم من العطور الفاخرة
        </h2>

        {/* الوصف */}
        <p className="text-lg md:text-xl text-cream max-w-2xl mx-auto mb-8 leading-relaxed fade-in">
          اكتشف مجموعتنا الحصرية من العطور الشرقية والفرنسية الأصيلة
          <br />
          حيث تلتقي الأناقة بالفخامة في كل قطرة
        </p>

        {/* الأزرار */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center fade-in">
          <button className="btn-primary flex items-center gap-2">
            استكشف المجموعة
            <ArrowLeft className="w-5 h-5" />
          </button>
          <button className="btn-secondary">
            تواصل معنا
          </button>
        </div>

        {/* الإحصائيات */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 max-w-4xl mx-auto">
          <div className="fade-in">
            <div className="text-4xl font-bold text-gold font-playfair mb-2">
              500+
            </div>
            <p className="text-cream text-sm">عطر فاخر</p>
          </div>
          <div className="fade-in">
            <div className="text-4xl font-bold text-gold font-playfair mb-2">
              50+
            </div>
            <p className="text-cream text-sm">علامة تجارية</p>
          </div>
          <div className="fade-in">
            <div className="text-4xl font-bold text-gold font-playfair mb-2">
              10K+
            </div>
            <p className="text-cream text-sm">عميل سعيد</p>
          </div>
          <div className="fade-in">
            <div className="text-4xl font-bold text-gold font-playfair mb-2">
              15+
            </div>
            <p className="text-cream text-sm">سنة خبرة</p>
          </div>
        </div>
      </div>

      {/* تأثير الموجة */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
        >
          <path
            d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z"
            fill="#FAF9F6"
          />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
