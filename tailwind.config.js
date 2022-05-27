module.exports = {
  content: ['./src/**/*.{html,js,jsx,tsx}'],
  darkMode: 'class',
  important: '#root',

  theme: {
    screens: {
      'custom-bk': '965px',
      small: '610px',
    },
    colors: {
      maincolor: 'var(--background)',
      darkybg: 'var(--background)',
      darkysubg: 'var(--subbackground)',
      buttonbg: 'var(--backgroundButton)',
    },
  },
  extend: {},
  plugins: [require('tailwind-scrollbar-hide')],
};
