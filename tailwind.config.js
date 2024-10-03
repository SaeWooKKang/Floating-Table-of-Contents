/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/contentScript/application/src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'toc-black': '#334155',
      },
    },
  },
  plugins: [],
}
