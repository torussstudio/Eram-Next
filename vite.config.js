import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // Enable code splitting for better caching and parallel loading
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks for better caching
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          // Separate GSAP if used
          'animation': ['gsap'],
          // UI components chunk
          'ui-components': ['react-icons'],
        },
      },
    },
    // Optimize build output
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
      },
    },
    // Target modern browsers for smaller bundle
    target: 'es2020',
    // Enable source maps in production for debugging
    sourcemap: false,
  },
  // Optimize dependencies
  optimizeDeps: {
    // Pre-bundle these dependencies
    include: ['react', 'react-dom', 'react-router-dom'],
  },
})
