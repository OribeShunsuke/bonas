import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          'SF Pro Display',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
      },
      colors: {
        'apple-blue': '#007AFF',
        'apple-gray': {
          50: '#F5F5F7',
          100: '#E8E8ED',
          200: '#D2D2D7',
          300: '#B0B0B8',
          400: '#86868B',
          500: '#6E6E73',
          600: '#515154',
          700: '#3A3A3C',
          800: '#2C2C2E',
          900: '#1C1C1E',
        },
      },
      boxShadow: {
        'apple': '0 4px 16px rgba(0, 0, 0, 0.08)',
        'apple-hover': '0 8px 24px rgba(0, 0, 0, 0.12)',
      },
    },
  },
  darkMode: 'class',
  plugins: [],
};

export default config;
