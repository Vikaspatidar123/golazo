/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/common/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          red: "#df0024",
          redDark: "#b7021f",
          navy: "#250e60",
          navyDark: "#1a0845",
          darkBg: "#0d0e12",
          cardBg: "#161820",
          cardBorder: "#272a38",
        },
      },
    },
  },
  plugins: [],
};
