/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}",],  
  theme: {
    extend: {

      // all colors subject to changes 
      colors: {
        
        // 'off-white': {
        //   DEFAULT: '#E3E3E3',
        // },
        // dark: {
        //   DEFAULT: '#1C1C1E',
        // },
        // 'soft-dark': {
        //   DEFAULT: '#2A2A2F',
        // },

        
        primary: "#F0EAD6",
        secondary: {
          DEFAULT: "#FF8C00",
          100: "#FF9001",
          200: "#FF8E01",
        },
        black: {
          DEFAULT: "#000",
          100: "#1E1E2D",
          200: "#232533",
        },

        gray: {
          100: "#CDCDE0",
        },

      },
      fontFamily: {
        pthin: ["Poppins-Thin", "sans-serif"],
        pextralight: ["Poppins-ExtraLight", "sans-serif"],
        plight: ["Poppins-Light", "sans-serif"],
        pregular: ["Poppins-Regular", "sans-serif"],
        pmedium: ["Poppins-Medium", "sans-serif"],
        psemibold: ["Poppins-SemiBold", "sans-serif"],
        pbold: ["Poppins-Bold", "sans-serif"],
        pextrabold: ["Poppins-ExtraBold", "sans-serif"],
        pblack: ["Poppins-Black", "sans-serif"],
      },
    },
  },
  plugins: [],
}

