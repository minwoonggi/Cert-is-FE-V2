import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#000000", // pure black
          foreground: "#ffffff", // pure white
        },
        secondary: {
          DEFAULT: "#111111", // very dark gray
          foreground: "#f5f5f5", // light gray
        },
        destructive: {
          DEFAULT: "#dc2626", // red-600
          foreground: "#fef2f2", // red-50
        },
        muted: {
          DEFAULT: "#1a1a1a", // very dark
          foreground: "#a3a3a3", // neutral-400
        },
        accent: {
          DEFAULT: "#dc2626", // red-600
          foreground: "#ffffff", // white
        },
        popover: {
          DEFAULT: "#0a0a0a", // almost black
          foreground: "#f5f5f5", // light gray
        },
        card: {
          DEFAULT: "#0f0f0f", // very dark
          foreground: "#f5f5f5", // light gray
        },
        cert: {
          black: "#000000", // pure black
          darker: "#0a0a0a", // almost black
          dark: "#111111", // very dark gray
          card: "#0f0f0f", // card background
          red: "#dc2626", // red-600
          light: "#ffffff", // pure white
          gray: "#737373", // neutral-500
          accent: "#3b82f6", // blue-500
          border: "#262626", // neutral-800
          muted: "#404040", // neutral-700
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
        glow: {
          "0%, 100%": { boxShadow: "0 0 5px rgba(220, 38, 38, 0.5)" },
          "50%": { boxShadow: "0 0 20px rgba(220, 38, 38, 0.8)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.6s ease-out",
        "slide-in": "slide-in 0.3s ease-out",
        glow: "glow 2s ease-in-out infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
