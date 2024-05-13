import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        // "Ellipse-1": "#DCE7FF",
        // "Ellipse-2": "#EFF4FF",
        // "text/third": "#B9B9B9",
        // "text/primary": "#013BB7",
        // "text/secondary": "#150936",
        // "text/paragraph": "#49556F",
        // "element/primary": "#EFF4FF",
        // "stroke/secondary": "#DCE7FF",
        'meta-red': { 1: '#EA4335' },
        'meta-green': { 1: '#34A853' },
        'meta-brown': { 1: '#A8000C' },
        'meta-blue': { 1: '#013BB7', 2: '#3751F2' },
        'meta-gray': { 1: '#B9B9B9', 2: '#F8FAFC' },
        'meta-purple': { 1: '#150936', 2: '#A804D1' },
        'meta-light-blue': { 1: '#DCE7FF', 2: '#EFF4FF', 3: '#49556F' },
      },
      backgroundColor: {
        // "bg/primary": "#F8FAFC",
        // "button/primary": "#3751F2",
        // "button/secondary": "#013BB7",
      },
      backgroundImage: {
        'hiring-btn-gradient':
          'linear-gradient(270deg, #3751F2 0%, #2687F5 26.68%, #17B3F8 73.61%, #08E2FB 100%)',
      },
    },
  },
  plugins: [],
};
export default config;
