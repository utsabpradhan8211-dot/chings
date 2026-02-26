/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          rose: '#ef4444',
          pink: '#dc2626',
          plum: '#be123c',
          navy: '#0b1f3a',
          sea: '#2dd4bf',
          deepSea: '#0f766e',
        },
      },
      boxShadow: {
        glow: '0 0 24px rgba(34, 197, 94, 0.35)',
      },
    },
  },
  plugins: [],
};
