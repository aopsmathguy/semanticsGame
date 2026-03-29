import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@common": path.resolve(__dirname, "../common"),
      buffer: path.resolve(__dirname, "node_modules/buffer/index.js"),
    },
  },
  base: "./",
  plugins: [react()]
})
