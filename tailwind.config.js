/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#635FC7",
        "primary-light": "#A8A4FF",
        dark: {
          DEFAULT: "#2B2C37",
          light: "#3E3F4E",
          veryDark: "#20212C",
        },
        light: {
          DEFAULT: "#F4F7FD",
          gray: "#E4EBFA",
        },
        text: {
          primary: "#000112",
          secondary: "#828FA3",
          light: "#FFFFFF",
        },
      },
    },
  },
  plugins: [],
};
