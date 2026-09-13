/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        limestone: {
          50: '#FAF6F0',
          100: '#F5EFEB',
          200: '#E8DCC8',
          300: '#D9C8AC',
          400: '#C4AF8E',
          500: '#AB9572',
          900: '#2A241C',
        },
        terracotta: {
          light: '#D87A4A',
          DEFAULT: '#C1683B',
          dark: '#9E4E26',
        },
        mediterranean: {
          deep: '#0D2B3A',
          blue: '#1B4965',
          navy: '#0F2C3E',
          dusk: '#14213D',
        },
        sandDark: {
          DEFAULT: '#141210',
          card: '#1C1916',
          border: '#2C2722',
        },
      },
      fontFamily: {
        serif: ['var(--font-serif-display)', 'Playfair Display', 'Georgia', 'serif'],
        italiana: ['var(--font-serif-italiana)', 'Italiana', 'serif'],
        sans: ['var(--font-sans)', 'Outfit', 'sans-serif'],
      },
      animation: {
        'subtle-pulse': 'subtlePulse 4s ease-in-out infinite',
        'slow-float': 'float 8s ease-in-out infinite',
      },
      keyframes: {
        subtlePulse: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.9' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
};
