// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import tailwindcss from '@tailwindcss/vite'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react(), tailwindcss()],
//   build: {
//     // Enable code splitting for better caching and parallel loading
//     rollupOptions: {
//       output: {
//         manualChunks: {
//           // Vendor chunks for better caching
//           'react-vendor': ['react', 'react-dom', 'react-router-dom'],
//           // Separate GSAP if used
//           'animation': ['gsap'],
//           // UI components chunk
//           'ui-components': ['react-icons'],
//         },
//       },
//     },
//     // Optimize build output
//     minify: 'terser',
//     terserOptions: {
//       compress: {
//         drop_console: true,
//       },
//     },
//     // Target modern browsers for smaller bundle
//     target: 'es2020',
//     // Enable source maps in production for debugging
//     sourcemap: false,
//   },
//   // Optimize dependencies
//   optimizeDeps: {
//     // Pre-bundle these dependencies
//     include: ['react', 'react-dom', 'react-router-dom'],
//   },
// })

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],

  build: {
    rollupOptions: {
      output: {

        manualChunks(id) {

          if (
            id.includes("react") ||
            id.includes("react-dom") ||
            id.includes("react-router-dom")
          ) {
            return "react-vendor";
          }

          if (id.includes("gsap")) {
            return "animation";
          }

          if (id.includes("react-icons")) {
            return "ui-components";
          }

          if (id.includes("node_modules")) {
            return "vendor";
          }
        },

      },
    },

    minify: 'terser',

    terserOptions: {
      compress: {
        drop_console: true,
      },
    },

    target: 'es2020',
    sourcemap: false,
  },

  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
  },
})