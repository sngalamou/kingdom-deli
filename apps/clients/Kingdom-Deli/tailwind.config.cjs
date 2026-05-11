const ngcBase = require('@ngc/config/tailwind');

/** @type {import('tailwindcss').Config} */
module.exports = {
  ...ngcBase,
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
    './node_modules/@ngc/ui/src/**/*.astro',
  ],
  theme: {
    ...ngcBase.theme,
    extend: {
      ...(ngcBase.theme && ngcBase.theme.extend),

      // Kingdom Deli palette — old-school Chicago deli.
      // Cream paper, mustard yellow, meat-counter red, charcoal ink.
      colors: {
        cream: {
          50: '#fdfaf3',
          100: '#f7f1de', // page bg
          200: '#ede3c4',
        },
        mustard: {
          50: '#fdf8e7',
          100: '#fbe9b4',
          400: '#e8b837',
          500: '#d4a017', // primary accent
          600: '#b07c08',
          900: '#5c3f00',
        },
        meatred: {
          50: '#fdecec',
          400: '#c33a3a',
          500: '#a32424', // secondary accent
          600: '#7e1818',
          900: '#3d0707',
        },
        charcoal: {
          800: '#2a2622',
          900: '#15110d', // body text / ink
        },
        relish: {
          500: '#5b8a3a', // tertiary, sparing use
        },
      },

      fontFamily: {
        display: ['"Alfa Slab One"', 'Georgia', '"Times New Roman"', 'serif'],
        body: ['Vollkorn', 'Georgia', '"Times New Roman"', 'serif'],
      },
    },
  },
};
