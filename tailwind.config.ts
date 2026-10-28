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
        background: "#080808",
        foreground: "#F7F5F0",
        cinematic: {
          black: "#080808",
          dark: "#0F0F10",
          charcoal: "#151515",
          surface: "#1A1A1C",
          border: "#26262A",
          muted: "#7E7E88",
        },
        champagne: {
          light: "#FAF4E1",
          soft: "#F2D98D",
          DEFAULT: "#E5C875",
        },
        gold: {
          50: "#FAF7EE",
          100: "#F3ECD4",
          200: "#E6D6A6",
          300: "#D7BD75",
          400: "#C9A84E",
          500: "#D4AF37", // Primary Metallic Gold
          600: "#B89428",
          700: "#91721B",
          800: "#6B5216",
          900: "#4D3912",
        },
        editorial: {
          white: "#F7F5F0",
          cream: "#EFECE4",
          charcoal: "#151515",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "-apple-system", "sans-serif"],
        display: ["var(--font-syne)", "Syne", "Space Grotesk", "sans-serif"],
        mono: ["var(--font-space)", "Space Grotesk", "monospace"],
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #F2D98D 0%, #D4AF37 50%, #91721B 100%)",
        "gold-shimmer": "linear-gradient(90deg, transparent 0%, rgba(242, 217, 141, 0.4) 50%, transparent 100%)",
        "dark-radial": "radial-gradient(circle at 50% 0%, rgba(212, 175, 55, 0.12) 0%, rgba(8, 8, 8, 0) 70%)",
        "warm-editorial": "linear-gradient(180deg, #F7F5F0 0%, #EFECE4 100%)",
      },
      boxShadow: {
        "gold-glow": "0 0 35px -5px rgba(212, 175, 55, 0.3)",
        "gold-glow-lg": "0 0 65px -10px rgba(212, 175, 55, 0.45)",
        "cinematic": "0 25px 50px -12px rgba(0, 0, 0, 0.7)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "marquee": "marquee 35s linear infinite",
        "marquee-reverse": "marquee-reverse 35s linear infinite",
        "float": "float 6s ease-in-out infinite",
        "shimmer": "shimmer 2.5s infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
