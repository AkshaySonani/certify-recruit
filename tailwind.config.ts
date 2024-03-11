import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        },
        colors:{
          "text/primary":"#013BB7",
          "text/secondary":"#150936",
          "text/paragraph":"#49556F"
        },
        backgroundColor:{
          "button/primary":"#3751F2",
          "button/secondary":"#013BB7",
          "bg/primary":"#F8FAFC"
      }
    },
  },
  plugins: [],
};
export default config;
