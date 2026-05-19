import { visualizer } from "rollup-plugin-visualizer";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
   plugins: [
  react(),
  tailwindcss(),
],
  build: {
    target: "es2020",
    sourcemap: false,
    minify: "oxc",           
    cssCodeSplit: true,
    assetsInlineLimit: 4096,
    rollupOptions: {
      output: {
       manualChunks(id) {
  if (id.includes("node_modules")) {
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

    return "vendor";
  }
}
      },
    },
    chunkSizeWarningLimit: 500,
  },
  optimizeDeps: {
    include: ["react", "react-dom"],
  },
});