import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      colors: {
        'c-red': '#f75454',
        // @TODO: use these two colors ?
        'c-crystal': '#54ecf7',
        'c-emerald': '#6ff754',
      },
      padding: {
        'gutter': '1rem',
        'gutter-sm': '2rem',
      },
      size: {
        'c-icon': '20px'
      },
    },
  },
  plugins: [],
} satisfies Config;
