import { Product } from '@/types/product';

// بيانات العطور الفاخرة
export const products: Product[] = [
  {
    id: '1',
    name: 'عنبر ملكي',
    nameEn: 'Royal Amber',
    description: 'عطر فاخر يجمع بين دفء العنبر والمسك الأصيل، تركيبة ملكية تعكس الفخامة والأناقة',
    descriptionEn: 'A luxurious fragrance combining warm amber and authentic musk',
    price: 499,
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&q=80',
    category: 'oriental',
    status: 'featured',
    notes: {
      top: ['البرغموت', 'الليمون', 'الزعفران'],
      middle: ['الورد', 'الياسمين', 'العنبر'],
      base: ['المسك', 'خشب الصندل', 'الفانيليا'],
    },
    inStock: true,
    quantity: 50,
    discount: 10,
    isDiscountActive: true,
    finalPrice: 449.1,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-02-01T14:30:00Z',
  },
  {
    id: '2',
    name: 'ورد دمشقي',
    nameEn: 'Damascus Rose',
    description: 'عبق الورد الدمشقي الأصيل في قارورة فاخرة، عطر نسائي راقي يأسر القلوب',
    descriptionEn: 'Authentic Damascus rose essence in a luxury bottle',
    price: 449,
    image: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59d75?w=800&q=80',
    category: 'women',
    status: 'bestseller',
    notes: {
      top: ['الورد البلغاري', 'الفريزيا'],
      middle: ['الورد الدمشقي', 'البنفسج'],
      base: ['المسك الأبيض', 'خشب الأرز'],
    },
    inStock: true,
    quantity: 75,
    discount: 0,
    isDiscountActive: false,
    finalPrice: 449,
    createdAt: '2024-01-10T09:00:00Z',
    updatedAt: '2024-01-10T09:00:00Z',
  },
  {
    id: '3',
    name: 'عود أصيل',
    nameEn: 'Authentic Oud',
    description: 'عطر العود الكمبودي الفاخر، تركيبة رجالية قوية تعكس الشخصية القيادية',
    descriptionEn: 'Premium Cambodian oud, a powerful masculine composition',
    price: 599,
    image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=800&q=80',
    category: 'men',
    status: 'featured',
    notes: {
      top: ['الفلفل الأسود', 'الهيل'],
      middle: ['العود الكمبودي', 'الجلد'],
      base: ['الباتشولي', 'المسك', 'العنبر'],
    },
    inStock: true,
    quantity: 30,
    discount: 15,
    isDiscountActive: true,
    finalPrice: 509.15,
    createdAt: '2024-01-20T11:00:00Z',
    updatedAt: '2024-02-05T16:00:00Z',
  },
  {
    id: '4',
    name: 'مسك الليل',
    nameEn: 'Night Musk',
    description: 'عطر شرقي فاخر بلمسة من المسك الأبيض والفانيليا، مثالي للمساء',
    descriptionEn: 'Oriental luxury with white musk and vanilla, perfect for evenings',
    price: 429,
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800&q=80',
    category: 'unisex',
    status: 'new',
    notes: {
      top: ['الماندرين', 'الكمثرى'],
      middle: ['المسك الأبيض', 'الياسمين'],
      base: ['الفانيليا', 'الأمبروكسان', 'خشب الصندل'],
    },
    inStock: true,
    quantity: 8,
    discount: 0,
    isDiscountActive: false,
    finalPrice: 429,
    createdAt: '2024-02-10T08:00:00Z',
    updatedAt: '2024-02-10T08:00:00Z',
  },
  {
    id: '5',
    name: 'لافندر بروفانس',
    nameEn: 'Provence Lavender',
    description: 'عطر فرنسي كلاسيكي بخلاصة اللافندر الطبيعي، انتعاش وأناقة في قارورة واحدة',
    descriptionEn: 'Classic French fragrance with natural lavender essence',
    price: 389,
    image: 'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=800&q=80',
    category: 'french',
    status: 'bestseller',
    notes: {
      top: ['اللافندر', 'النعناع', 'الليمون'],
      middle: ['اللافندر الفرنسي', 'إكليل الجبل'],
      base: ['خشب الأرز', 'الفيتيفر'],
    },
    inStock: true,
    quantity: 100,
    discount: 5,
    isDiscountActive: true,
    finalPrice: 369.55,
    createdAt: '2024-01-05T07:00:00Z',
    updatedAt: '2024-01-28T12:00:00Z',
  },
  {
    id: '6',
    name: 'زهر الياسمين',
    nameEn: 'Jasmine Blossom',
    description: 'عطر نسائي راقي بخلاصة زهر الياسمين الطبيعي، حلم في قارورة',
    descriptionEn: 'Elegant women\'s perfume with natural jasmine extract',
    price: 459,
    image: 'https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=800&q=80',
    category: 'women',
    status: 'featured',
    notes: {
      top: ['البرغموت', 'الكشمش الأسود'],
      middle: ['الياسمين المصري', 'زنبق الوادي'],
      base: ['المسك', 'خشب الصندل', 'الفانيليا'],
    },
    inStock: true,
    quantity: 45,
    discount: 0,
    isDiscountActive: false,
    finalPrice: 459,
    createdAt: '2024-01-12T10:30:00Z',
    updatedAt: '2024-01-12T10:30:00Z',
  },
  {
    id: '7',
    name: 'سدر أخضر',
    nameEn: 'Green Cedar',
    description: 'عطر رجالي منعش بخلاصة خشب الأرز والنوتات الخضراء، قوة وحيوية',
    descriptionEn: 'Fresh masculine scent with cedar wood and green notes',
    price: 419,
    image: 'https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?w=800&q=80',
    category: 'men',
    status: 'new',
    notes: {
      top: ['الجريب فروت', 'النعناع', 'الريحان'],
      middle: ['خشب الأرز', 'الشاي الأخضر'],
      base: ['الفيتيفر', 'الطحلب', 'المسك'],
    },
    inStock: true,
    quantity: 60,
    discount: 0,
    isDiscountActive: false,
    finalPrice: 419,
    createdAt: '2024-02-12T09:00:00Z',
    updatedAt: '2024-02-12T09:00:00Z',
  },
  {
    id: '8',
    name: 'روز غولد',
    nameEn: 'Rose Gold',
    description: 'تحفة فنية تجمع بين الورد والعود والذهب السائل، عطر للجنسين بلمسة استثنائية',
    descriptionEn: 'Artistic masterpiece combining rose, oud and liquid gold',
    price: 649,
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=800&q=80',
    category: 'unisex',
    status: 'featured',
    notes: {
      top: ['الزعفران', 'الهيل', 'الورد التركي'],
      middle: ['العود البورمي', 'الورد البلغاري'],
      base: ['العنبر الرمادي', 'المسك', 'الباتشولي'],
    },
    inStock: true,
    quantity: 25,
    discount: 20,
    isDiscountActive: true,
    finalPrice: 519.2,
    createdAt: '2024-01-08T11:30:00Z',
    updatedAt: '2024-02-08T15:00:00Z',
  },
];

// الحصول على المنتجات المميزة
export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.status === 'featured');
};

// الحصول على أفضل المبيعات
export const getBestsellerProducts = (): Product[] => {
  return products.filter(product => product.status === 'bestseller');
};

// الحصول على المنتجات الجديدة
export const getNewProducts = (): Product[] => {
  return products.filter(product => product.status === 'new');
};

// الحصول على منتج بواسطة المعرف
export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};
