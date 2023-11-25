/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  mode: 'jit',
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  plugins: [require('daisyui')],
  theme: {
    extend: {
      fontFamily: {
        verve: ['Verve'],
        sans: ['verve', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        brown: '#5D5145',
      },
      minHeight: {
        160: '40rem',
      },
      maxWidth: {
        18: '18rem',
      },
    },
  },
  daisyui: {
    themes: [
      {
        light: {
          ...require('daisyui/src/theming/themes')['light'],
          color: '#5D5145',
        },
        dark: {
          ...require('daisyui/src/theming/themes')['dark'],
          color: '#5D5145',
        },
      },
    ],
  },
}
