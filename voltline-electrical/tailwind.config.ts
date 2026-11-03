import type { Config } from "tailwindcss";

/**
 * "Single-line diagram" theme: the whole site reads like a drafting sheet.
 * Re-theme by changing these five colours.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0C2B4B", // navy ink: text, lines, primary buttons
        paper: "#DDE8EC", // drafting paper (page background under the grid)
        sheet: "#F7FAFB", // lighter "sheet" used for panels, tables, forms
        copper: "#9A3E0C", // earth-trace copper: accents, hover, focus ring
        stamp: "#B3261E", // inspector's stamp red: emergencies, errors, CoC stamp
      },
      // Fonts are self-hosted via @fontsource (imported in app/layout.tsx)
      fontFamily: {
        sans: [
          "Bricolage Grotesque Variable",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
        mono: [
          "IBM Plex Mono",
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "monospace",
        ],
      },
    },
  },
  plugins: [],
};

export default config;
