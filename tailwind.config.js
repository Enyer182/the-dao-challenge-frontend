/* eslint-disable @typescript-eslint/no-var-requires */
import colors from 'tailwindcss/colors';
/** @type {import('tailwindcss').Config} */
export const content = ['./index.html', './src/**/*.{js,ts,jsx,tsx}'];
export const theme = {
  extend: {
    colors: {
      ...colors,
    },
  },
};
