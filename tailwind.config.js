/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
    mode: 'jit',
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
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
        },
    },
    plugins: [],
}
