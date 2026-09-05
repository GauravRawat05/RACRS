import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: "#FAF8F5",
          50: "#FCFBF9",
          100: "#FAF8F5",
          200: "#F5F0EA",
          300: "#ECE5DC",
        },
        wheatish: "#F5F0EA",
        editorial: {
          DEFAULT: "#FAF8F5",
          surface: "#FFFFFF",
          bg: "#FAF8F5",
          wheat: "#F5F0EA",
          text: "#2D3142",
          secondary: "#4F5D75",
          muted: "#8D99AE",
          border: {
            DEFAULT: "#E5E0D8",
            hover: "#C8C2B9",
          },
        },
        pastel: {
          mint: {
            DEFAULT: "#E8F5E9",
            bg: "#E8F5E9",
            text: "#2E7D32",
            border: "#C8E6C9",
          },
          rose: {
            DEFAULT: "#FCE4EC",
            bg: "#FCE4EC",
            text: "#C2185B",
            border: "#F8BBD0",
          },
          sky: {
            DEFAULT: "#E3F2FD",
            bg: "#E3F2FD",
            text: "#1565C0",
            border: "#BBDEFB",
          },
          peach: {
            DEFAULT: "#FFF3E0",
            bg: "#FFF3E0",
            text: "#E65100",
            border: "#FFE0B2",
          },
          lavender: {
            DEFAULT: "#F3E5F5",
            bg: "#F3E5F5",
            text: "#7B1FA2",
            border: "#E1BEE7",
          },
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        serif: ["var(--font-serif)"],
      },
    },
  },
  plugins: [],
};
export default config;
