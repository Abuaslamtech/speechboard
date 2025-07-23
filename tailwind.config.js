/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: [
    "./App.tsx",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        background: "#0C0C0E", // Deep Charcoal
        card: "#1B1C1E", // Dark Slate
        textPrimary: "#F2F2F2", // Light Text
        accentBlue: "#00CFFF", // Aqua Blue
        iconOrange: "#FF6B35", // Vivid Orange
        iconGreen: "#00AA84", // Deep Teal
        iconRed: "#FF4C4C", // Soft Red
        iconIndigo: "#4E94FF", // Cool Indigo
      },
    },
  },
  plugins: [],
};
