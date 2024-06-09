import path from "path"; // @ts-expect-error no type deps
import react from "@vitejs/plugin-react"; // @ts-expect-error no types deps
import { defineConfig } from "vite";

import tailwindcss from "tailwindcss";

export default defineConfig({
  plugins: [react()],
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
