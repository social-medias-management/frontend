import type { Config } from "tailwindcss";

const multiThemePlugin = require("./theme/multi-theme-plujin.cjs");
const themes = require("./theme/theme.json");

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./templates/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  plugins: [multiThemePlugin({ colorThemes: themes })],
};
export default config;
