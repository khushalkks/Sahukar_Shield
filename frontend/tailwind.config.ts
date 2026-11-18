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
        navy: {
          900: "#071324",
          800: "#0B1F3A", // Primary brand deep navy
          700: "#132D52",
          600: "#1E3A8A",
          100: "#E2E8F0",
          50: "#F1F5F9",
        },
        teal: {
          500: "#14B8A6", // Shield accent teal
          600: "#0D9488",
        },
        shield: {
          safe: "#16A34A",
          risky: "#F59E0B",
          predatory: "#DC2626",
          bg: "#F8FAFC",
        },
      },
      fontFamily: {
        sans: ["Inter", "Noto Sans Devanagari", "system-ui", "sans-serif"],
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
    },
  },
  plugins: [],
};
export default config;
