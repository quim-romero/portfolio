/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      colors: {
        brand: "#4CCEBA",
        "brand-dark": "#2DD4BF",
        "brand-light": "#A7F3D0",
        muted: "#4B5563",
        dark: "#111827",
        light: "#F9FAFB",
        "text-base": "#1F2937",
        "text-light": "#F3F4F6",
      },
      boxShadow: {
        "xl-soft": "0 10px 20px rgba(0, 0, 0, 0.07)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-15px)" },
        },
        "float-reverse": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(15px)" },
        },
        glitch: {
          "0%, 100%": {
            transform: "scale(1)",
            filter: "contrast(100%) brightness(1)",
          },
          "50%": {
            transform: "scale(1.02)",
            filter: "contrast(140%) brightness(1.2)",
          },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-reverse": "float-reverse 8s ease-in-out infinite",
        glitch: "glitch 0.2s steps(2, start) infinite",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
