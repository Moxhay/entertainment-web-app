/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors:{
      primaryRed: '#FC4747',
      primaryDarkBlue: '#10141E',
      secondaryDarkBlue: '#161D2F',
      greyishBlue: '#5A698F',
      primaryWhite: '#ffffff',

    }
  },
  plugins: [],
}
