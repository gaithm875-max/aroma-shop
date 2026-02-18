import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Aroma Shop - متجر العطور الفاخرة | Luxury Perfume Shop',
  description: 'اكتشف مجموعتنا الفاخرة من العطور الشرقية والفرنسية الأصيلة. عطور رجالية ونسائية راقية بأفضل الأسعار.',
  keywords: 'عطور, عطور فاخرة, عطور رجالية, عطور نسائية, عطور شرقية, عطور فرنسية, perfume, luxury perfume',
  authors: [{ name: 'Aroma Shop' }],
  openGraph: {
    title: 'Aroma Shop - متجر العطور الفاخرة',
    description: 'اكتشف مجموعتنا الفاخرة من العطور الشرقية والفرنسية الأصيلة',
    type: 'website',
    locale: 'ar_SA',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aroma Shop - متجر العطور الفاخرة',
    description: 'اكتشف مجموعتنا الفاخرة من العطور الشرقية والفرنسية الأصيلة',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
