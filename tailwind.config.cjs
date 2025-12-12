// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "lux-black": "#0A0A0C",
        "lux-navy": "#0A0F2C",
        "lux-gold": "#D4AF37",
        "lux-cream": "#F8F5F0",
      },
      fontFamily: {
        serif: ['"Playfair Display"', "serif"],
        sans: ['"Montserrat"', "sans-serif"],
      },
    },
  },
  plugins: [],
};