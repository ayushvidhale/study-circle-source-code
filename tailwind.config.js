/** @type {import('tailwindcss').Config} */
module.exports = {
  
  mode: 'jit',
  darkMode: 'false', // or 'media' or 'class'

  
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {colors: {
      gray: {
        '100': '#F3F4F6',
        '200': '#E5E7EB',
        '300': '#D1D5DB',
        '400': '#9CA3AF',
        '500': '#6B7280',
        '600': '#4B5563',
        '700': '#374151',
        '800': '#1F2937',
        '900': '#111827',
      },
      'appBg': '#1A1A2E',
      'navbar': '#161b22',
      'navbarDark': '#0d1117',
    },},
    
  },
  plugins: [],
}
