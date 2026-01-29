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
        terracotta: {
          DEFAULT: "#C17A5C",
          dark: "#A66B4F",
        },
        sage: {
          DEFAULT: "#8B9E7D",
          light: "#A3B496",
        },
        cream: {
          DEFAULT: "#F5EFE7",
          dark: "#EDE5D9",
        },
        olive: {
          DEFAULT: "#3D4B3A",
          light: "#4A5C46",
        },
        blush: {
          DEFAULT: "#E8D5C4",
          light: "#F0E2D5",
        },
      },
      fontFamily: {
        cormorant: ['"Cormorant Garamond"', "Georgia", "serif"],
        inter: ['"Inter"', "system-ui", "-apple-system", "sans-serif"],
        noto: ['"Noto Serif JP"', "serif"],
      },
      fontSize: {
        "hero": ["4rem", { lineHeight: "1.1" }],
        "hero-mobile": ["2.5rem", { lineHeight: "1.2" }],
        "section": ["2.5rem", { lineHeight: "1.2" }],
        "section-mobile": ["1.75rem", { lineHeight: "1.3" }],
      },
      spacing: {
        "section": "5rem",
        "section-mobile": "2.5rem",
      },
      borderRadius: {
        card: "8px",
      },
      boxShadow: {
        card: "0 4px 6px -1px rgba(61, 75, 58, 0.1), 0 2px 4px -1px rgba(61, 75, 58, 0.06)",
        "card-hover": "0 10px 15px -3px rgba(61, 75, 58, 0.1), 0 4px 6px -2px rgba(61, 75, 58, 0.05)",
      },
      transitionDuration: {
        "hover": "200ms",
      },
    },
  },
  plugins: [],
};
export default config;
