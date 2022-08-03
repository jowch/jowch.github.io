/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./components/**/*.{js,jsx}",
    "./pages/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        'serif': ['Erode', ...defaultTheme.fontFamily.serif],
        'sans': ['Satoshi', ...defaultTheme.fontFamily.sans],
      }
    },
    container: {
      center: true
    }
  },
  plugins: [],
}
