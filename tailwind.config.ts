import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: "var(--bg-primary)",
          secondary: "var(--bg-secondary)",
          texture: "var(--bg-texture)",
        },
        text: {
          primary: "var(--text-primary)",
          muted: "var(--text-muted)",
        },
        accent: {
          hot: "var(--accent-hot)",
          warm: "var(--accent-warm)",
          cool: "var(--accent-cool)",
        },
        ink: {
          black: "var(--ink-black)",
        },
        flash: {
          white: "var(--flash-white)",
        },
      },
      fontSize: {
        hero: "var(--text-hero)",
      },
      fontFamily: {
        display: ["var(--font-stencil)", "sans-serif"],
        body: ["var(--font-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
