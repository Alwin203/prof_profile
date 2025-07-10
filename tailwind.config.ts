import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        "press-start": ["'Press Start 2P'", "cursive"],
        'apple': ["-apple-system", "BlinkMacSystemFont", "ubuntu", "system-ui"],
      },
    },
  },
  plugins: [],
};
export default config;
