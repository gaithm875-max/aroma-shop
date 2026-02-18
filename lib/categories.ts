import { Category } from '@/types/product';

// بيانات الفئات
export const categories: Category[] = [
  {
    id: '1',
    name: 'عطور رجالية',
    nameEn: 'Men\'s Perfumes',
    description: 'عطور رجالية فاخرة تعكس القوة والأناقة',
    icon: 'User',
    slug: 'men',
  },
  {
    id: '2',
    name: 'عطور نسائية',
    nameEn: 'Women\'s Perfumes',
    description: 'عطور نسائية راقية تبرز الأنوثة والجمال',
    icon: 'Heart',
    slug: 'women',
  },
  {
    id: '3',
    name: 'عطور للجنسين',
    nameEn: 'Unisex Perfumes',
    description: 'عطور عصرية تناسب الجميع',
    icon: 'Users',
    slug: 'unisex',
  },
  {
    id: '4',
    name: 'عطور شرقية',
    nameEn: 'Oriental Perfumes',
    description: 'عطور شرقية أصيلة بنكهة عربية فاخرة',
    icon: 'Sparkles',
    slug: 'oriental',
  },
  {
    id: '5',
    name: 'عطور فرنسية',
    nameEn: 'French Perfumes',
    description: 'عطور فرنسية كلاسيكية بلمسة معاصرة',
    icon: 'Star',
    slug: 'french',
  },
];

// الحصول على فئة بواسطة المعرف
export const getCategoryById = (id: string): Category | undefined => {
  return categories.find(category => category.id === id);
};

// الحصول على فئة بواسطة الـ slug
export const getCategoryBySlug = (slug: string): Category | undefined => {
  return categories.find(category => category.slug === slug);
};
