/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"], // Adjust as needed
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"], // Define the Poppins font
      },
      colors: {
        'custom-dark-red': '#650A0A',
        'vanilla' : '#FFE4C6'
      }
    },
  },
  plugins: [],
};
