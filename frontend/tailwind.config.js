/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'Helvetica', 'Helvetica Neue', 'Nunito Sans'],
      },
      colors: {
        brand: {
          primary: '#c1292e',
          background: '#ffffff',
          header: '#e2e1e1',
          white: '#ffffff',
          'white-hover': '#f2f2f2',
          red: '#c1292e',
          'red-hover': '#a61d24',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
