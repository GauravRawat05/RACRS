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
        cream: "#FAF8F5",
        wheatish: "#F5F0EA",
        editorial: "#FAF8F5", // Alias for cream as per project rules
        pastel: {
          mint: "#E8F5E9",
          rose: "#FCE4EC",
          lavender: "#F3E5F5",
          sky: "#E3F2FD",
          peach: "#FFF3E0",
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
