

// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import tailwindcss from '@tailwindcss/vite'

// export default defineConfig({
//   plugins: [react(), tailwindcss()],

//   build: {
//     rollupOptions: {
//       output: {

//         manualChunks(id) {

//           if (
//             id.includes("react") ||
//             id.includes("react-dom") ||
//             id.includes("react-router-dom")
//           ) {
//             return "react-vendor";
//           }

//           if (id.includes("gsap")) {
//             return "animation";
//           }

//           if (id.includes("react-icons")) {
//             return "ui-components";
//           }

//           if (id.includes("node_modules")) {
//             return "vendor";
//           }
//         },

//       },
//     },

//     minify: 'terser',

//     terserOptions: {
//       compress: {
//         drop_console: true,
//       },
//     },

//     target: 'es2020',
//     sourcemap: false,
//   },

//   optimizeDeps: {
//     include: ['react', 'react-dom', 'react-router-dom'],
//   },
// })

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],

  build: {
    target: "es2020",
    sourcemap: false,
    minify: "terser",

    terserOptions: {
      compress: {
        drop_console: true,
      },
    },

    rollupOptions: {
      output: {
        manualChunks(id) {
          // React core
          if (
            id.includes("react") ||
            id.includes("react-dom") ||
            id.includes("react-router-dom")
          ) {
            return "react";
          }

          // GSAP (heavy)
          if (id.includes("gsap")) {
            return "gsap";
          }

          // Lenis (scroll lib)
          if (id.includes("lenis")) {
            return "lenis";
          }

          // Icons
          if (id.includes("lucide-react")) {
            return "icons";
          }
        },
      },
    },

    chunkSizeWarningLimit: 500,
  },

  optimizeDeps: {
    include: ["react", "react-dom"],
  },
});