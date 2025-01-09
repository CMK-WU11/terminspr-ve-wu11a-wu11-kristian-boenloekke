/** @type {import('tailwindcss').Config} */
export default {
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
        customOrange: "#F4A88E",
        customGray: "#E4E4E4"
      },
      fontSize: {
        xxl: "62px",
        xl: "50px",
        lg: "28px",
        base: "22px",
        sm: "20px",
        xs: "16px",
        xxs: "14px",
      }
    },
  },
  plugins: [],
};
