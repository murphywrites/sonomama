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
        // Miami Vice color palette - update hex values here to change site-wide
        terracotta: {
          DEFAULT: "#FF2D92",  // Hot pink - CTAs, accents, links
          dark: "#E0247F",
        },
        sage: {
          DEFAULT: "#00E5FF",  // Cyan/turquoise - section backgrounds
          light: "#5EECFF",
        },
        cream: {
          DEFAULT: "#FFF8F5",  // Warm off-white - base background
          dark: "#FFE8E0",
        },
        olive: {
          DEFAULT: "#0D1B2A",  // Dark navy - text, headings
          light: "#1B2D3E",
        },
        blush: {
          DEFAULT: "#FFB4D2",  // Soft pink - subtle accents, hovers
          light: "#FFCDE2",
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
        card: "0 4px 6px -1px rgba(13, 27, 42, 0.1), 0 2px 4px -1px rgba(13, 27, 42, 0.06)",
        "card-hover": "0 10px 15px -3px rgba(13, 27, 42, 0.1), 0 4px 6px -2px rgba(13, 27, 42, 0.05)",
      },
      transitionDuration: {
        "hover": "200ms",
      },
    },
  },
  plugins: [],
};
export default config;
