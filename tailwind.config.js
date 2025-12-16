/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,vue}",
    "./.storybook/**/*.{js,ts,jsx,tsx,vue}",
  ],
  theme: {
    extend: {
      keyframes: {
        "card-deck-enter": {
          "0%": { opacity: "0", transform: "scale(0.9)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
      animation: {
        "card-deck-enter": "card-deck-enter 0.35s ease forwards",
      },
    },
  },
  plugins: [],
};
