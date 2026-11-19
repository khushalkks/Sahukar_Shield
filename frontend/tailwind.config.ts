import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        fintech: {
          dark: "#080C14",
          card: "#0E1526",
          elevated: "#152038",
          border: "#1E2C4A",
          muted: "#8A99AD",
          gold: "#D97706",
          emerald: "#10B981",
          ruby: "#E11D48",
        },
        navy: {
          950: "#060A12",
          900: "#080E1A",
          800: "#0E172A",
          700: "#1E293B",
          600: "#334155",
          100: "#E2E8F0",
          50: "#F8FAFC",
        },
        gold: {
          400: "#FBBF24",
          500: "#F59E0B",
          600: "#D97706",
          700: "#B45309",
        },
        shield: {
          safe: "#10B981",
          risky: "#F59E0B",
          predatory: "#E11D48",
          bg: "#080C14",
        },
      },
      fontFamily: {
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        mono: ["JetBrains Mono", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "monospace"],
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
