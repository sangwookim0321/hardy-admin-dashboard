import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        colorSky: "#3E80D5",
      },
      fontFamily: {
        sans: ['var(--font-pretendard)', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config;
