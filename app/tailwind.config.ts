import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0D1117",
        surface: "#161B22",
        "surface-2": "#1C2333",
        "surface-3": "#21262D",
        border: "#30363D",
        "border-subtle": "#21262D",
        primary: "#0066FF",
        "primary-hover": "#0052CC",
        "primary-muted": "rgba(0,102,255,0.15)",
        accent: "#00C2FF",
        "accent-muted": "rgba(0,194,255,0.12)",
        violet: "#7C3AED",
        "violet-muted": "rgba(124,58,237,0.15)",
        success: "#22C55E",
        "success-muted": "rgba(34,197,94,0.12)",
        warning: "#F5C542",
        "warning-muted": "rgba(245,197,66,0.12)",
        danger: "#EF4444",
        "danger-muted": "rgba(239,68,68,0.12)",
        "text-primary": "#E6EDF3",
        "text-secondary": "#8B949E",
        "text-muted": "#484F58",
        "text-inverse": "#0D1117",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
      },
      borderRadius: {
        DEFAULT: "0.5rem",
        sm: "0.375rem",
        md: "0.5rem",
        lg: "0.75rem",
        xl: "1rem",
        "2xl": "1.5rem",
      },
      boxShadow: {
        card: "0 1px 3px rgba(0,0,0,0.4), 0 1px 2px rgba(0,0,0,0.3)",
        "card-hover": "0 4px 12px rgba(0,0,0,0.5), 0 2px 4px rgba(0,0,0,0.4)",
        glow: "0 0 20px rgba(0,194,255,0.25)",
        "glow-primary": "0 0 20px rgba(0,102,255,0.3)",
        "inner-border": "inset 0 0 0 1px rgba(48,54,61,0.8)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "hero-glow": "radial-gradient(ellipse 80% 60% at 50% -20%, rgba(0,194,255,0.15), transparent)",
        "card-shine": "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, transparent 50%)",
        "primary-gradient": "linear-gradient(135deg, #0066FF, #00C2FF)",
        "accent-gradient": "linear-gradient(135deg, #00C2FF, #7C3AED)",
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease-out",
        "slide-up": "slideUp 0.4s ease-out",
        "slide-down": "slideDown 0.3s ease-out",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
        shimmer: "shimmer 1.5s infinite",
      },
      keyframes: {
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        slideUp: {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        slideDown: {
          from: { opacity: "0", transform: "translateY(-8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 10px rgba(0,194,255,0.2)" },
          "50%": { boxShadow: "0 0 25px rgba(0,194,255,0.5)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
