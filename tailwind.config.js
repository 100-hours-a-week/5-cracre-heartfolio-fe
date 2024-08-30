/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,jsx,js}"],
  theme: {
    fontFamily: {
      "Ubuntu" : ["Ubuntu"],
      "DoHyeon" : ["Do Hyeon"]
    },
    extend: {
      colors: {
        btnClickColor: "#FFBBC0",
        toastColor: "#FFA3B2",
        iconColor: "#FF4359",
        btnNoClickColor: "#FFE7E9",
        btnDisabledColor: "#fef5f6",
        boxBackgroundColor: "#EEEEEE",
        boxHoverColor: "#C9C9C9",
        modalBtnColor: "#B3B3B3",
        blueColor: "#1573FE",
        redColor: "#DF1525",
        backColor: "#FFF7F8"
      },
    },
  },
  container: {
    center: true,
  },
  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/forms"), require('daisyui'),],
};
