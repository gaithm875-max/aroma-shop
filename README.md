# Aroma Shop 🌹✨

<div align="center">

![Aroma Shop](https://images.unsplash.com/photo-1541643600914-78b084683601?w=1200&h=300&fit=crop)

**متجر إلكتروني فاخر لبيع العطور الشرقية والفرنسية الأصيلة**

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

</div>

---

## 📖 نظرة عامة

**Aroma Shop** هو متجر إلكتروني فاخر متخصص في بيع العطور الراقية. تم تصميمه باستخدام أحدث التقنيات لتوفير تجربة مستخدم استثنائية مع واجهة أنيقة تعكس فخامة المنتجات.

### ✨ الميزات الرئيسية

- 🎨 **تصميم فاخر وأنيق** - واجهة مستخدم راقية مستوحاة من أفضل العلامات التجارية العالمية
- 🌍 **دعم كامل للغة العربية** - مع RTL (Right-to-Left) لتجربة مثالية
- 📱 **تصميم متجاوب بالكامل** - يعمل بشكل مثالي على جميع الأجهزة
- ⚡ **أداء عالي** - مبني على Next.js 14 مع تحسينات الأداء
- 🎭 **تأثيرات حركية سلسة** - animations وتأثيرات hover احترافية
- 🛍️ **عرض المنتجات الفاخر** - بطاقات منتجات أنيقة مع تفاصيل كاملة
- 🏷️ **تصنيف متقدم** - تصفح حسب الفئات (رجالي، نسائي، شرقي، فرنسي، للجنسين)
- 🎯 **تجربة مستخدم متميزة** - navigation سهل وواضح

---

## 🚀 التقنيات المستخدمة

<table>
<tr>
<td>

### Frontend
- **Next.js 14** - React Framework مع App Router
- **React 18** - مكتبة JavaScript للواجهات
- **TypeScript** - للكود الآمن والقوي
- **Tailwind CSS** - للتصميم السريع والمرن

</td>
<td>

### التصميم والأيقونات
- **Lucide React** - أيقونات عصرية ونظيفة
- **Google Fonts** - خطوط فاخرة
  - Playfair Display (للعناوين)
  - Cairo & Tajawal (للنصوص العربية)
  - Inter (للنصوص الإنجليزية)

</td>
</tr>
</table>

---

## 📦 التثبيت والتشغيل

### المتطلبات الأساسية

تأكد من تثبيت:
- **Node.js** (الإصدار 18 أو أحدث)
- **npm** أو **yarn** أو **pnpm**

### خطوات التثبيت

1. **استنساخ المشروع**
```bash
git clone https://github.com/gaithm875-max/aroma-shop.git
cd aroma-shop
```

2. **تثبيت المكتبات**
```bash
npm install
# أو
yarn install
# أو
pnpm install
```

3. **تشغيل المشروع في وضع التطوير**
```bash
npm run dev
# أو
yarn dev
# أو
pnpm dev
```

4. **افتح المتصفح**
اذهب إلى [http://localhost:3000](http://localhost:3000)

### بناء المشروع للإنتاج

```bash
npm run build
npm run start
```

---

## 📁 هيكل المشروع

```
aroma-shop/
├── app/                      # مجلد التطبيق الرئيسي (Next.js 14 App Router)
│   ├── layout.tsx           # التخطيط الرئيسي مع Meta Tags
│   ├── page.tsx             # الصفحة الرئيسية
│   └── globals.css          # الستايلات العامة
├── components/               # المكونات القابلة لإعادة الاستخدام
│   ├── Navbar.tsx           # شريط التنقل
│   ├── Footer.tsx           # التذييل
│   ├── Hero.tsx             # قسم البطل
│   ├── ProductCard.tsx      # بطاقة المنتج
│   └── CategoryCard.tsx     # بطاقة الفئة
├── lib/                     # البيانات والوظائف المساعدة
│   ├── products.ts          # بيانات العطور
│   └── categories.ts        # بيانات الفئات
├── types/                   # أنواع TypeScript
│   └── product.ts           # أنواع المنتجات والفئات
├── public/                  # الملفات الثابتة
├── tailwind.config.ts       # إعدادات Tailwind
├── tsconfig.json            # إعدادات TypeScript
├── next.config.js           # إعدادات Next.js
└── package.json             # معلومات المشروع والمكتبات
```

---

## 🎨 لوحة الألوان

تم اختيار لوحة ألوان فاخرة ومتناسقة:

| اللون | Hex | الاستخدام |
|------|-----|----------|
| **كريمي فاتح** | `#FAF9F6` | الخلفية الرئيسية |
| **بيج** | `#F5F3EF` | الخلفيات الثانوية |
| **كحلي غامق** | `#1A1A2E` | النصوص الرئيسية |
| **ذهبي فاخر** | `#D4AF37` | العناصر المميزة والأزرار |
| **ذهبي** | `#C9A961` | الـ hover والتأكيدات |
| **وردي ناعم** | `#E8C4C4` | الـ highlights |
| **بني داكن** | `#3E2723` | النصوص الثانوية |
| **أبيض نقي** | `#FFFFFF` | البطاقات والعناصر |

---

## 📸 لقطات الشاشة

### الصفحة الرئيسية
![Hero Section](https://via.placeholder.com/1200x600/1A1A2E/D4AF37?text=Hero+Section)

### عرض المنتجات
![Products Grid](https://via.placeholder.com/1200x600/FAF9F6/1A1A2E?text=Products+Grid)

### قسم الفئات
![Categories](https://via.placeholder.com/1200x600/F5F3EF/D4AF37?text=Categories)

---

## 🎯 الميزات المستقبلية

- [ ] نظام سلة التسوق
- [ ] صفحة تفاصيل المنتج
- [ ] نظام البحث المتقدم
- [ ] التصفية حسب الفئات والسعر
- [ ] نظام المفضلة (Wishlist)
- [ ] نظام المراجعات والتقييمات
- [ ] التكامل مع بوابات الدفع
- [ ] لوحة تحكم الإدارة
- [ ] نظام تتبع الطلبات
- [ ] Multi-language support (English)

---

## 👨‍💻 التطوير

### إضافة منتج جديد

قم بتعديل ملف `lib/products.ts`:

```typescript
{
  id: '9',
  name: 'اسم العطر',
  nameEn: 'Perfume Name',
  description: 'وصف العطر بالعربية',
  descriptionEn: 'Description in English',
  price: 499,
  image: 'https://images.unsplash.com/...',
  category: 'men', // men, women, unisex, oriental, french
  status: 'new', // new, featured, bestseller
  notes: {
    top: ['نوتة 1', 'نوتة 2'],
    middle: ['نوتة 1', 'نوتة 2'],
    base: ['نوتة 1', 'نوتة 2'],
  },
  inStock: true,
}
```

### إضافة فئة جديدة

قم بتعديل ملف `lib/categories.ts`:

```typescript
{
  id: '6',
  name: 'اسم الفئة بالعربية',
  nameEn: 'Category Name',
  description: 'وصف الفئة',
  icon: 'IconName', // من Lucide React
  slug: 'category-slug',
}
```

---

## 🤝 المساهمة

نرحب بمساهماتكم! إذا كنت ترغب في المساهمة:

1. Fork المشروع
2. أنشئ Branch جديد (`git checkout -b feature/AmazingFeature`)
3. Commit التغييرات (`git commit -m 'Add some AmazingFeature'`)
4. Push إلى Branch (`git push origin feature/AmazingFeature`)
5. افتح Pull Request

---

## 📝 الترخيص

هذا المشروع مرخص تحت [MIT License](LICENSE).

---

## 📞 تواصل معنا

- **الموقع الإلكتروني:** [aromashop.sa](https://aromashop.sa)
- **البريد الإلكتروني:** info@aromashop.sa
- **الهاتف:** +966 50 123 4567

---

<div align="center">

**صُنع بـ ❤️ في المملكة العربية السعودية**

⭐ إذا أعجبك المشروع، لا تنسى إعطائه نجمة!

</div>