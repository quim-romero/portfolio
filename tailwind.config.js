/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: '#4CCEBA',
        'brand-dark': '#2DD4BF',
        'brand-light': '#A7F3D0',
        dark: '#111827',
        light: '#F9FAFB',
        'text-base': '#1F2937',
        'text-light': '#F3F4F6',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
