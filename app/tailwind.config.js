/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    // colors: {
    //   'blue': '#007bff',
    //   'indigo': '#6610f2',
    //   'purple': '#6f42c1',
    //   'pink': '#e83e8c',
    //   'red': '#dc3545',
    //   'orange': '#fd7e14',
    //   'yellow': ' #ffc107',
    //   'green': ' #28a745',
    //   'teal': '#20c997',
    //   'cyan': '#17a2b8',
    //   'white': ' #fff;',
    //   'gray': ' #6c757d',
    //   'gray-dark': '#343a40',
    //   'primary': '#007bff',
    //   'secondary': ' #6c757d',
    //   'success': '#28a745',
    //   'info': '#17a2b8',
    //   'warning': '#ffc107',
    //   'danger': '#dc3545',
    //   'light': '#f8f9fa',
    //   'dark': '#343a40'
    // },
    fontFamily: {
      'montserrat': ['Montserrat', 'sans-serif'],
      'cookie': ['Cookie', 'cursive'],
      'pop': ['Poppins', 'sans-serif'],
      'quicksand': ['Quicksand', 'sans-serif'],
    },
    extend: {
      backgroundImage :{
        'home-bg': "url('/src/assets/images/section/home.jpg')",
      }
    },
  },
  plugins: [],
}