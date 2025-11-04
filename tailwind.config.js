/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: { extend: {} },
  plugins: [],
  // 👇 Disable OKLCH color functions so Tailwind uses rgb() instead
  future: {
    disableColorOpacityUtilitiesByDefault: true,
    disableColorFunctions: true,
  },
};
  