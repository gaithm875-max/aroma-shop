import { Category } from '@/types/product';
import { User, Heart, Users, Sparkles, Star } from 'lucide-react';

interface CategoryCardProps {
  category: Category;
}

const CategoryCard = ({ category }: CategoryCardProps) => {
  // اختيار الأيقونة المناسبة
  const getIcon = () => {
    switch (category.icon) {
      case 'User':
        return <User className="w-8 h-8" />;
      case 'Heart':
        return <Heart className="w-8 h-8" />;
      case 'Users':
        return <Users className="w-8 h-8" />;
      case 'Sparkles':
        return <Sparkles className="w-8 h-8" />;
      case 'Star':
        return <Star className="w-8 h-8" />;
      default:
        return <Sparkles className="w-8 h-8" />;
    }
  };

  return (
    <a
      href={`#${category.slug}`}
      className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-cream to-white p-8 shadow-luxury hover:shadow-luxury-hover transition-all duration-300 hover:-translate-y-2"
    >
      {/* الخلفية المتحركة */}
      <div className="absolute inset-0 bg-gradient-to-br from-gold/0 to-gold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* المحتوى */}
      <div className="relative z-10">
        {/* الأيقونة */}
        <div className="inline-flex p-4 bg-gold/10 text-gold rounded-full mb-4 group-hover:bg-gold group-hover:text-white transition-all duration-300 group-hover:scale-110">
          {getIcon()}
        </div>

        {/* الاسم */}
        <h3 className="text-2xl font-bold text-navy-dark mb-2 font-playfair group-hover:text-gold transition-colors">
          {category.name}
        </h3>

        {/* الاسم بالإنجليزية */}
        <p className="text-sm text-brown/60 mb-3 font-inter">
          {category.nameEn}
        </p>

        {/* الوصف */}
        <p className="text-brown leading-relaxed">
          {category.description}
        </p>

        {/* سهم الانتقال */}
        <div className="mt-4 flex items-center gap-2 text-gold font-semibold group-hover:gap-4 transition-all">
          <span>استكشف</span>
          <svg
            className="w-5 h-5 transform group-hover:-translate-x-2 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </div>
      </div>

      {/* تأثير التألق */}
      <div className="absolute top-0 left-0 w-full h-full shimmer opacity-0 group-hover:opacity-100" />
    </a>
  );
};

export default CategoryCard;
