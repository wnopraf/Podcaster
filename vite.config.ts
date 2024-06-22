import path from "path";
import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
  },
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
  build: {
    minify: process.env.NODE_ENV === "production" ? "esbuild" : false,
    cssMinify: process.env.NODE_ENV === "production" ? "esbuild" : false,
    sourcemap: process.env.NODE_ENV === "production" ? false : true,
  },
  resolve: {
    alias: {
      "@/": path.join(__dirname, "src/"),
    },
  },
});
