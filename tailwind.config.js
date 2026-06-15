/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#06080d',
        panel: '#0d111a',
        line: 'rgba(148, 163, 184, 0.18)',
        neon: '#58f3c8',
        cyanline: '#62d9ff',
      },
      boxShadow: {
        'studio': '0 24px 90px rgba(0, 0, 0, 0.36)',
        'focus-glow': '0 0 0 1px rgba(88, 243, 200, 0.32), 0 18px 60px rgba(88, 243, 200, 0.08)',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'Segoe UI', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
