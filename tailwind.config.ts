import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        hearthBeat: {
          "0%": { opacity: ".75" },
          "50%": { transform: "scale(1.25)", opacity: "1" },
          "100%": { transform: "scale(.95)", opacity: ".9" },
        },
      },
      animation: {
        hearthBeat: "hearthBeat 1s ease-in-out infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
