/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      flexGrow: {
        1: "1",
        2: "2"
      }
    },
  },
  plugins: [],
}
