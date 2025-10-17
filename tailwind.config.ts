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
        // Industrial Color Palette
        primary: {
          DEFAULT: "#F59E0B", // Amber 500 - Safety orange/industrial warning
          50: "#FFFBEB",
          100: "#FEF3C7",
          200: "#FDE68A",
          300: "#FCD34D",
          400: "#FBBF24",
          500: "#F59E0B",
          600: "#D97706",
          700: "#B45309",
          800: "#92400E",
          900: "#78350F",
        },
        gunmetal: {
          50: "#F8FAFC",
          100: "#F1F5F9",
          200: "#E2E8F0",
          300: "#CBD5E1",
          400: "#94A3B8",
          500: "#64748B",
          600: "#475569",
          700: "#334155",
          800: "#1E293B",
          900: "#0F172A",
        },
        steel: {
          50: "#F8FAFC",
          100: "#F1F5F9",
          200: "#E2E8F0",
          300: "#CBD5E1",
          400: "#94A3B8",
          500: "#64748B",
          600: "#475569",
          700: "#334155",
          800: "#1E293B",
          900: "#0F172A",
          950: "#020617",
        },
        success: "#10B981", // Emerald 500
        danger: "#EF4444", // Red 500
        'tech-blue': {
          400: "#60A5FA",
          500: "#3B82F6",
          600: "#2563EB",
        },
      },
      fontFamily: {
        'industrial': ['Roboto Condensed', 'Bebas Neue', 'sans-serif'],
        'technical': ['Inter', 'sans-serif'],
        'mono-tech': ['JetBrains Mono', 'Roboto Mono', 'monospace'],
      },
      boxShadow: {
        'rivet': '0 2px 4px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.2)',
        'industrial': '0 4px 8px rgba(0,0,0,0.4), 0 2px 4px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.1)',
        'metal': '0 1px 3px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1), inset 0 -1px 0 rgba(0,0,0,0.2)',
      },
      backgroundImage: {
        'metal-gradient': 'linear-gradient(135deg, #64748B 0%, #475569 50%, #334155 100%)',
        'warning-stripe': 'repeating-linear-gradient(45deg, #F59E0B 0px, #F59E0B 10px, #1E293B 10px, #1E293B 20px)',
      },
      animation: {
        'mechanical-press': 'mechanicalPress 0.3s ease-in-out',
        'hydraulic-open': 'hydraulicOpen 0.5s ease-out',
        'warning-pulse': 'warningPulse 2s infinite',
      },
      keyframes: {
        mechanicalPress: {
          '0%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(2px)' },
          '100%': { transform: 'translateY(0)' },
        },
        hydraulicOpen: {
          '0%': { transform: 'scaleY(0)', transformOrigin: 'top' },
          '100%': { transform: 'scaleY(1)', transformOrigin: 'top' },
        },
        warningPulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
