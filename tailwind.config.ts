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
        background: "#0A0A0A",
        foreground: "#F4F4F5",
        brand: {
          black: "#0A0A0A",
          dark: "#121214",
          card: "#18181B",
          "card-hover": "#222226",
          border: "#27272A",
          muted: "#71717A",
          light: "#F4F4F5",
          white: "#FFFFFF",
        },
        gold: {
          50: "#FAF7EE",
          100: "#F3ECD4",
          200: "#E6D6A6",
          300: "#D7BD75",
          400: "#C9A84E",
          500: "#D4AF37", // Primary gold
          600: "#B89428",
          700: "#91721B",
          800: "#6B5216",
          900: "#4D3912",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        display: ["var(--font-cinzel)", "serif"],
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #F3ECD4 0%, #D4AF37 50%, #91721B 100%)",
        "gold-gradient-hover": "linear-gradient(135deg, #FFFFFF 0%, #D4AF37 60%, #B89428 100%)",
        "dark-radial": "radial-gradient(circle at 50% 0%, rgba(212, 175, 55, 0.08) 0%, rgba(10, 10, 10, 0) 70%)",
      },
      boxShadow: {
        "gold-glow": "0 0 25px -5px rgba(212, 175, 55, 0.25)",
        "gold-glow-lg": "0 0 45px -10px rgba(212, 175, 55, 0.35)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 6s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
