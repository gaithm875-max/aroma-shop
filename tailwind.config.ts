import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // الألوان الفاخرة المخصصة
        cream: {
          light: '#FAF9F6',
          DEFAULT: '#F5F3EF',
        },
        navy: {
          dark: '#1A1A2E',
          DEFAULT: '#16213E',
        },
        gold: {
          light: '#D4AF37',
          DEFAULT: '#C9A961',
        },
        rose: {
          light: '#F2D7D9',
          DEFAULT: '#E8C4C4',
        },
        brown: {
          dark: '#3E2723',
          DEFAULT: '#4E342E',
        },
      },
      fontFamily: {
        playfair: ['Playfair Display', 'serif'],
        cairo: ['Cairo', 'sans-serif'],
        tajawal: ['Tajawal', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-luxury': 'linear-gradient(135deg, #FAF9F6 0%, #F5F3EF 100%)',
        'gradient-gold': 'linear-gradient(135deg, #D4AF37 0%, #C9A961 100%)',
      },
      boxShadow: {
        'luxury': '0 10px 40px rgba(0, 0, 0, 0.1)',
        'luxury-hover': '0 20px 60px rgba(0, 0, 0, 0.15)',
      },
    },
  },
  plugins: [],
}
export default config
