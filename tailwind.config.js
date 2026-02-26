/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          rose: '#fb7185',
          pink: '#ec4899',
          plum: '#a855f7',
        },
      },
      boxShadow: {
        glow: '0 0 24px rgba(244, 114, 182, 0.55)',
      },
    },
  },
  plugins: [],
};
