/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './App.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#58C047',
        secondary: '#9BD23C',
        chat: '#B4DD6D',
        cardPrimary: '#FFFFD8',
        cardSecondary: '#EDEDED',
        cardTertiary: '#DADADA',
      },
    },
  },
  plugins: [],
};
