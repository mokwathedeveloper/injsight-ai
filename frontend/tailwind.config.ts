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
        background: "var(--background)",
        foreground: "var(--foreground)",
        page: "#0D1117",
        card: "#161B22",
        hover: "#1C2128",
        border: "#21262D",
        "border-strong": "#30363D",
        primary: {
          DEFAULT: "#0066FF",
          hover: "#0052CC",
        },
        accent: "#00C2FF",
        success: "#22C55E",
        warning: "#F5C542",
        error: "#EF4444",
        "text-primary": "#F0F6FC",
        "text-secondary": "#8B949E",
        "text-disabled": "#484F58",
        "text-link": "#58A6FF",
      },
      borderRadius: {
        lg: "0.5rem",
        md: "calc(0.5rem - 2px)",
        sm: "calc(0.5rem - 4px)",
      },
    },
  },
  plugins: [],
};
export default config;
