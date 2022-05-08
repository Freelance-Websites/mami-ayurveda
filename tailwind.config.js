module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: [
        "Poppins",
        "ui-sans-serif",
        "system-ui",
        "Helvetica",
        "Arial",
        "sans-serif",
      ],
      serif: [
        "Crimson Pro",
        "Times New Roman",
        "serif",
      ]
    },
    extend: {},
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}
