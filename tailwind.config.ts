import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        dark: "#1A1A1A",
        primary: '#0069FF',
        danger: '#C84545',
        light: '#FAFAFA',
        purple: '#8247F5',
        blue: '#4200FF',
        success: '#008B68',
        lemon: '#EAB308'
      },
    },
  },
  plugins: [],
};
export default config;
