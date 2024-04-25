/** @type {import('tailwindcss').Config} */
module.exports = {
 
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  
  ],
  theme: {
    extend: {
      keyframes: {
        circleOuter135: {
          '0%': { 'stroke-dashoffset': '25' },
          '25%': { 'stroke-dashoffset': '0' },
          '65%': { 'stroke-dashoffset': '301' },
          '80%': { 'stroke-dashoffset': '276' },
          '100%': { 'stroke-dashoffset': '276' },
        },
        circleMiddle6123: {
          '0%': { 'stroke-dashoffset': '17' },
          '25%': { 'stroke-dashoffset': '0' },
          '65%': { 'stroke-dashoffset': '204' },
          '80%': { 'stroke-dashoffset': '187' },
          '100%': { 'stroke-dashoffset': '187' },
        },
        circleInner162: {
          '0%': { 'stroke-dashoffset': '9' },
          '25%': { 'stroke-dashoffset': '0' },
          '65%': { 'stroke-dashoffset': '106' },
          '80%': { 'stroke-dashoffset': '97' },
          '100%': { 'stroke-dashoffset': '97' },
        },
        textAnimation76: {
          '0%': { 'clip-path': 'inset(0 100% 0 0)' },
          '50%': { 'clip-path': 'inset(0)' },
          '100%': { 'clip-path': 'inset(0 0 0 100%)' },
        },
      },
      animation: {
        circleOuter135: 'circleOuter135 1.8s ease infinite 0.3s',
        circleMiddle6123: 'circleMiddle6123 1.8s ease infinite 0.25s',
        circleInner162: 'circleInner162 1.8s ease infinite 0.2s',
        textAnimation76: 'textAnimation76 3.6s ease infinite',
      },

      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
      },
      boxShadow: {
        'myshadow': '0 0px 30px -15px rgba(0, 0, 0, 0.3)',
      },
      screens: {
            
        'sm': {'max': '1120px'},

        'md':  {'max': '1100px'},
        // => @media (min-width: 768px) { ... }
  
        'lg': '1024px',
        // => @media (min-width: 1024px) { ... }
  
        'xl': '1280px',
        // => @media (min-width: 1280px) { ... }
  
        '2xl': '1536px',
        // => @media (min-width: 1536px) { ... }
      },
      colors:{
        button:'#8350DF',
        cardBg:'#0F0F0F',
        tableBg:'#121212',
      },
    },
  },
  plugins: [],
}

