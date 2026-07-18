import type { Config } from "tailwindcss";

/**
 * Colors are exposed as RGB channel triplets in CSS variables (see app/globals.css)
 * so Tailwind's `<alpha-value>` opacity modifiers work (e.g. `bg-accent/10`).
 * The `--accent` variable is re-bound per lens + per theme, so any `accent` utility
 * animates when the lens toggles.
 */
const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ground: "rgb(var(--ground) / <alpha-value>)",
        panel: "rgb(var(--panel) / <alpha-value>)",
        line: "rgb(var(--line) / <alpha-value>)",
        ink: {
          DEFAULT: "rgb(var(--ink) / <alpha-value>)",
          soft: "rgb(var(--ink-soft) / <alpha-value>)",
        },
        accent: "rgb(var(--accent) / <alpha-value>)",
        success: "rgb(var(--success) / <alpha-value>)",
      },
      fontFamily: {
        display: ["var(--font-display)", "ui-sans-serif", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      maxWidth: {
        content: "72rem",
      },
      boxShadow: {
        // Soft lift for cards — meaningful on the light theme, invisible on dark.
        card: "0 1px 2px rgb(17 24 39 / 0.04), 0 14px 34px -18px rgb(17 24 39 / 0.16)",
      },
      transitionProperty: {
        accent: "color, background-color, border-color, fill, stroke, box-shadow",
      },
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(12px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        blink: {
          "50%": { opacity: "0" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease forwards",
        blink: "blink 1.1s step-end infinite",
      },
    },
  },
  plugins: [],
};

export default config;
