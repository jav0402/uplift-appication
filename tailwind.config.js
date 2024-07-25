/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}",],  
  theme: {
    extend: {

      // all colors subject to changes 
      colors: {
        'off-white': {
          DEFAULT: '#E3E3E3',
        },
        dark: {
          DEFAULT: '#1C1C1E',
        },
        'soft-dark': {
          DEFAULT: '#2A2A2F',
        },
        primary: ' '
      },
    },
  },
  plugins: [],
}

