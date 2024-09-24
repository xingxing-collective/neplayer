import { resolve } from "node:path"
import Vue from "@vitejs/plugin-vue"
import tailwindcss from "tailwindcss"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [Vue()],
  build: {
    sourcemap: true,
    lib: {
      entry: resolve(__dirname, "packages/index.ts"),
      name: "neplayer",
    },
    rollupOptions: {
      output: [
        {
          format: "cjs",
          entryFileNames: "[name].js",
          globals: {
            vue: "Vue",
          },
        },
        {
          format: "esm",
          entryFileNames: "[name].mjs",
        },
      ],
      external: ["vue"],
    },
  },
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
})
