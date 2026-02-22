import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Aroma Shop | متجر العطور الفاخرة",
  description: "متجر إلكتروني لبيع العطور الفاخرة",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50`}
      >
        <nav className="bg-white shadow-sm border-b border-amber-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <a href="/" className="flex items-center gap-2">
                <span className="text-2xl">🌹</span>
                <span className="text-xl font-bold text-amber-800">Aroma Shop</span>
              </a>
              <div className="flex items-center gap-4">
                <a href="/" className="text-gray-600 hover:text-amber-700 text-sm font-medium">الرئيسية</a>
                <a href="/profile" className="text-gray-600 hover:text-amber-700 text-sm font-medium">حسابي</a>
              </div>
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
