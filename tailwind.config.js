/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,jsx,js}"],
  theme: {
    extend: {
      colors :{
        btnclickColor: "#FFBBC0",
        toastColor: "#FFA3B2",
        iconColor: "#FF4359",
        btnNoClickColor: "#FFE7E9",
        boxBackgroundColor: "#EEEEEE",
        modalBtnColor: "#B3B3B3",
        blueColor: "#1573FE",
        redColor : "#DF1525"
        },
      },
    },
    container: {
      center: true,
    },
  plugins: [require('@tailwindcss/typography'), require("@tailwindcss/forms")],
};
