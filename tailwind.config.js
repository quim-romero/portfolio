/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#4B8063",
          dark: "#3A6551",
          light: "#76B293",
          lightHover: "#94C3A9",
        },
        accent: "#EDE6DB",
        background: "#0f0f11",
        foreground: "#fafafa",
        muted: "#a1a1aa",
        light: {
          background: "#ffffff",
          foreground: "#0f0f11",
          muted: "#6b7280",
        },
        dark: {
          background: "#0f0f11",
          foreground: "#fafafa",
          muted: "#a1a1aa",
        },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
      },
      boxShadow: {
        soft: "0 4px 30px rgba(0, 0, 0, 0.08)",
      },
      transitionTimingFunction: {
        "soft-ease": "cubic-bezier(0.4, 0, 0.2, 1)",
      },
      transitionProperty: {
        colors: "background-color, border-color, color, fill, stroke",
        spacing: "margin, padding",
        transform: "transform",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0, transform: "translateY(10px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.6s ease-out forwards",
      },
    },
  },
  plugins: [],
};
