/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,jsx,js}"],
  theme: {
    container:{
      center:true,
    },
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
