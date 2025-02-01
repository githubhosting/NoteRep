const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  darkMode: 'class',
  // darkMode: 'media',
  theme: {
    fontSize: {
      xs: ['0.75rem', { lineHeight: '1rem' }],
      sm: ['0.875rem', { lineHeight: '1.5rem' }],
      base: ['1rem', { lineHeight: '1.5rem' }],
      lg: ['1.125rem', { lineHeight: '2rem' }],
      xl: ['1.25rem', { lineHeight: '2rem' }],
      '2xl': ['1.5rem', { lineHeight: '2.5rem' }],
      '3xl': ['2rem', { lineHeight: '2.5rem' }],
      '4xl': ['2.5rem', { lineHeight: '3rem' }],
      '5xl': ['3rem', { lineHeight: '3.5rem' }],
      '6xl': ['4rem', { lineHeight: '1' }],
      '7xl': ['5rem', { lineHeight: '1' }],
      '8xl': ['6rem', { lineHeight: '1' }],
      '9xl': ['8rem', { lineHeight: '1' }],
    },
    extend: {
      backgroundImage: (theme) => ({
        'image-one':
          "url('https://images.unsplash.com/photo-1629651480694-edb8451b31aa?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80')",
        'image-two':
          "url('https://images.unsplash.com/photo-1629651726230-6430554a8890?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2734&q=80')",
      }),
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
        display: ['DM Sans', ...defaultTheme.fontFamily.sans],
      },
      maxWidth: {
        '2xl': '40rem',
      },
      dropShadow: {
        '3xl': '0 35px 35px rgba(0, 0, 0, 0.25)',
        '4xl': [
          '0 35px 35px rgba(0, 0, 0, 0.25)',
          '0 45px 65px rgba(0, 0, 0, 0.15)',
        ],
        '5xl': [
          '0 35px 35px rgba(255, 255, 255, 0.25)',
          '0 45px 65px rgba(255, 255, 255, 0.15)',
          '0 55px 85px rgba(255, 255, 255, 0.15)',
        ],
      },
      boxShadow: {
        num_l: ['20px 20px 60px #caced9', '-20px -20px 60px #ffffff'],
        num_d: '3px 3px 3px #1c1d26, -3px -3px 3px #343746',
        num_d0: ['4px 4px 8px #121b33b0', '-4px -4px 8px #121b33'],
        num_d1: ['10px 10px 20px #04070d', '-10px -10px 20px #121b33'],
        num_d2: ['20px 20px 51px #04070d', '-20px -20px 51px #121b33'],
        num_d3: ['30px 30px 51px #04070d', '-30px -30px 51px #121b33'],
        '5xl': [
          '0 10px 15px -3px rgb(255 255 255 / 0.1)',
          '0 4px 6px -4px rgb(255 255 255 / 0.1)',
        ],
        '6xl': [
          '0 20px 25px -5px rgb(255 255 255 / 0.1)',
          '0 10px 10px -5px rgb(255 255 255 / 0.1)',
        ],
      },
      dropShadow: {
        light: '0 0 0 3px rgba(255, 255, 255, 0.5)',
      },
      colors: {
        cost1: '#009FFD',
        cost2: '#2A2A72',
        cost3: '#09C6F9',
        cost4: '#045DE9',
        cost5: '#0B1120',
      },
    },
    animation: {
      shimmer: 'shimmer 2s linear infinite',
    },
    keyframes: {
      shimmer: {
        from: {
          backgroundPosition: '0 0',
        },
        to: {
          backgroundPosition: '-200% 0',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
  plugins: [require('daisyui')],
}
