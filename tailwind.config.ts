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
        'meta-green': { 1: '#34A853' },
        'meta-brown': { 1: '#A8000C' },
        'meta-red': { 1: '#EA4335', 2: '#FF0C0C' },
        'meta-gray': { 1: '#B9B9B9', 2: '#F8FAFC' },
        'meta-purple': { 1: '#150936', 2: '#A804D1' },
        'meta-blue': { 1: '#013BB7', 2: '#3751F2', 3: '#001A51', 4: '#002779' },
        'meta-light-blue': {
          1: '#DCE7FF',
          2: '#EFF4FF',
          3: '#49556F',
          4: '#F1FAF4',
        },
      },
      backgroundColor: {
        // "bg/primary": "#F8FAFC",
        // "button/primary": "#3751F2",
        // "button/secondary": "#013BB7",
      },
      backgroundImage: {
        'hiring-btn-gradient':
          'linear-gradient(270deg, #3751F2 0%, #2687F5 26.68%, #17B3F8 73.61%, #08E2FB 100%)',
        'certificate-border':
          'linear-gradient(to bottom, #FFFFFF 0%, #013BB7 50%, #07E2FA 100%)',
        // 'certificate-border':
        //   'linear-gradient(180deg, rgba(255, 255, 255, 0) 48.95%, #013BB7 76.96%, #07E2FA 100%)',
      },
    },
  },
  plugins: [],
};
export default config;
