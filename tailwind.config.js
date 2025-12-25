/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          purple: '#8c52ff',
          blue: '#5271ff',
        },
        neutral: {
          dark: '#333',
          white: '#fff',
          light: '#ededed',
        },
      },
    },
  },
  plugins: [],
};
