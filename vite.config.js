// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import tailwindcss from "@tailwindcss/vite";

// export default defineConfig({
//   plugins: [react(), tailwindcss()],

//   build: {
//     target: "es2020",
//     sourcemap: false,
//     minify: "terser",

//     terserOptions: {
//       compress: {
//         drop_console: true,
//       },
//     },

//     rollupOptions: {
//       output: {
//         manualChunks(id) {
//           // React core
//           if (
//             id.includes("react") ||
//             id.includes("react-dom") ||
//             id.includes("react-router-dom")
//           ) {
//             return "react";
//           }

//           // GSAP (heavy)
//           if (id.includes("gsap")) {
//             return "gsap";
//           }

//           // Lenis (scroll lib)
//           if (id.includes("lenis")) {
//             return "lenis";
//           }

//           // Icons
//           if (id.includes("lucide-react")) {
//             return "icons";
//           }
//         },
//       },
//     },

//     chunkSizeWarningLimit: 500,
//   },

//   optimizeDeps: {
//     include: ["react", "react-dom"],
//   },
// });

// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import tailwindcss from "@tailwindcss/vite";

// export default defineConfig({
//   plugins: [react(), tailwindcss()],

//   build: {
//     target: "es2020",

//     sourcemap: false,

//     minify: "terser",

//     cssCodeSplit: true,

//     modulePreload: {
//       polyfill: false,
//     },

//     assetsInlineLimit: 4096,

//     terserOptions: {
//       compress: {
//         drop_console: true,
//         drop_debugger: true,
//       },
//     },

//     rollupOptions: {
//       output: {
//         manualChunks(id) {

//           // React core
//           if (
//             id.includes("react") ||
//             id.includes("react-dom") ||
//             id.includes("react-router-dom")
//           ) {
//             return "react";
//           }

//           // GSAP
//           if (id.includes("gsap")) {
//             return "gsap";
//           }

//           // Lenis
//           if (id.includes("lenis")) {
//             return "lenis";
//           }

//           // Icons
//           if (id.includes("lucide-react")) {
//             return "icons";
//           }

//           // Vendor fallback
//           if (id.includes("node_modules")) {
//             return "vendor";
//           }
//         },
//       },
//     },

//     chunkSizeWarningLimit: 500,
//   },

//   optimizeDeps: {
//     include: ["react", "react-dom"],
//   },
// });


import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    target: "es2020",
    sourcemap: false,
    minify: "oxc",           // ✅ Vite 8 native minifier
    cssCodeSplit: true,
    assetsInlineLimit: 4096,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("react") || id.includes("react-dom") || id.includes("react-router-dom")) return "react";
          if (id.includes("gsap")) return "gsap";
          if (id.includes("lenis")) return "lenis";
          if (id.includes("lucide-react")) return "icons";
          if (id.includes("node_modules")) return "vendor";
        },
      },
    },
    chunkSizeWarningLimit: 500,
  },
  optimizeDeps: {
    include: ["react", "react-dom"],
  },
});