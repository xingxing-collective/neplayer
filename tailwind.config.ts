import type { Config } from "tailwindcss"

export default (<Partial<Config>>{
  content: ["./index.html", "./packages/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "rgb(var(--player-background) / <alpha-value>)",
        foreground: "rgb(var(--player-foreground) / <alpha-value>)",
      },
    },
  },
})
