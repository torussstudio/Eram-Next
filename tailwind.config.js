// export default {
//   content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
//   theme: {
//     extend: {
//       fontFamily: {
//         sans: ['"Red Hat Display"', 'sans-serif'],
//         display: ['Agency', 'sans-serif'],
//           rethink: ['"Rethink Sans"', 'sans-serif'],
//       },
//     },
//   },
// }

export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      screens: {
        xs: '390px',
      },
      fontFamily: {
        sans: ['"Red Hat Display"', 'sans-serif'],
        display: ['Agency', 'sans-serif'],
        rethink: ['"Rethink Sans"', 'sans-serif'],
      },
    },
  },
}