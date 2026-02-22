export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-amber-50 to-white py-20 px-6 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-amber-900 mb-4">
          🌹 Aroma Shop
        </h1>
        <p className="text-lg text-amber-700 mb-8">
          متجر العطور الفاخرة — اكتشف روائح تأسر الحواس
        </p>
        <a
          href="/profile"
          className="inline-block bg-amber-700 text-white px-8 py-3 rounded-full text-sm font-semibold hover:bg-amber-800 transition-colors"
        >
          حسابي الشخصي
        </a>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
          العطور المميزة
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { name: "عود الملوك", price: "٢٥٠ ريال", emoji: "🪵" },
            { name: "ورد الطائف", price: "١٨٠ ريال", emoji: "🌹" },
            { name: "المسك الأبيض", price: "٢٢٠ ريال", emoji: "🌿" },
          ].map((product) => (
            <div
              key={product.name}
              className="bg-white rounded-2xl shadow-sm border border-amber-100 p-6 hover:shadow-md transition-shadow text-center"
            >
              <div className="text-5xl mb-4">{product.emoji}</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {product.name}
              </h3>
              <p className="text-amber-700 font-bold mb-4">{product.price}</p>
              <button className="w-full bg-amber-50 text-amber-800 border border-amber-200 rounded-full py-2 text-sm font-medium hover:bg-amber-100 transition-colors">
                أضف إلى السلة
              </button>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
