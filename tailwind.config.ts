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
        editorial: "#FAF8F5", // Alias for cream as per project rules
        pastel: {
          mint: "#E2F0CB",
          rose: "#FFDFD3",
          lavender: "#E0BBE4",
          sky: "#B5EAD7",
          peach: "#FFDAC1",
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
