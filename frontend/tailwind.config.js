/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'border-color':'#BBBBBB',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.scrollbar-none': {
          'scrollbar-width': 'none', /* For Firefox */
          '-ms-overflow-style': 'none', /* For IE and Edge */
        },
        '.scrollbar-none::-webkit-scrollbar': {
          display: 'none', /* For Chrome, Safari, and Opera */
        },
      });
    },
  ],
}

