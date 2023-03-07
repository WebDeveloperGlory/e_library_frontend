/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    fontFamily: {
      display: ['Open Sans', 'sans-serif'],
      body: ['Open Sans', 'sans-serif'],
    },
    extend: {
      animation: {
        slideRight: 'slideRight 0.5s 0s linear 1 forwards',
        bounceDelay: 'bounce 0.5s 1s infinite;'
      },
      keyframes: {
        slideRight: {
          '0%': {
            transform: 'width(0rem)'
          },
          '100%': {
            transform: 'width(18rem)'
          }
        }
      },
      fontSize: {
        14: '14px',
      },
      backgroundColor: {
        'main-bg': '#FAFBFB',
        'main-dark-bg': '#20232A',
        'secondary-dark-bg': '#33373E',
        'light-gray': '#F7F7F7',
        'half-transparent': 'rgba(0, 0, 0, 0.5)',
      },
      borderWidth: {
        1: '1px',
      },
      borderColor: {
        color: 'rgba(0, 0, 0, 0.1)',
      },
      width: {
        400: '400px',
        760: '760px',
        780: '780px',
        800: '800px',
        1000: '1000px',
        1200: '1200px',
        1400: '1400px',
      },
      height: {
        80: '80px',
      },
      minHeight: {
        590: '590px',
      },
      backgroundImage: {
        'hero-pattern':
          "url('https://demos.wrappixel.com/premium-admin-templates/react/flexy-react/main/static/media/welcome-bg-2x-svg.25338f53.svg')",
      },
      colors: {
        'th-dark-1': 'var(--dark1)',
        'th-dark-2': 'var(--dark2)',
        'th-orange' : 'var(--orange)',
        'th-blue': 'var(--blue)',
        'th-red': 'var(--red)',
        'th-yellow': 'var(--yellowish)',
        'cu-yellow': '#ffce00',
        'cu-blue': '#64acff',
        'cu-glowy-blue': '#45f3ff'
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
};