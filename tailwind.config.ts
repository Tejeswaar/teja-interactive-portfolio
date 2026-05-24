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
        ctp: Object.fromEntries(
          [
            "base", "mantle", "crust",
            "surface0", "surface1", "surface2",
            "overlay0", "overlay1", "overlay2",
            "subtext0", "subtext1", "text",
            "blue", "lavender", "sapphire", "sky", "teal",
            "green", "yellow", "peach", "maroon", "red",
            "mauve", "pink", "flamingo", "rosewater",
          ].map((name) => [
            name,
            `rgb(var(--ctp-${name}) / <alpha-value>)`,
          ])
        ),
      },
      fontFamily: {
        mono: ["var(--font-jetbrains)", "JetBrains Mono", "monospace"],
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
      },
      animation: {
        "cursor-blink": "blink 1s step-end infinite",
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "slide-up": "slideUp 0.6s ease-out forwards",
        "slide-in-right": "slideInRight 0.4s ease-out forwards",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
        "progress-fill": "progressFill 1.5s ease-out forwards",
      },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        slideUp: {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        slideInRight: {
          from: { opacity: "0", transform: "translateX(-10px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 5px rgba(137,180,250,0.3)" },
          "50%": { boxShadow: "0 0 20px rgba(137,180,250,0.6)" },
        },
        progressFill: {
          from: { width: "0%" },
          to: { width: "var(--target-width)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
