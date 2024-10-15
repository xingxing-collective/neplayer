import path from "node:path"
import alias from "@rollup/plugin-alias"
import resolve from "@rollup/plugin-node-resolve"
import Vue from "@vitejs/plugin-vue"
import tailwindcss from "tailwindcss"
import Icons from "unplugin-icons/vite"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [Vue(), Icons()],
  build: {
    sourcemap: true,
    lib: {
      entry: path.resolve(__dirname, "packages/index.ts"),
      name: "neplayer",
    },
    rollupOptions: {
      output: [
        {
          format: "cjs",
          entryFileNames: "[name].js",
          exports: "named",
          globals: {
            vue: "Vue",
          },
        },
        {
          format: "esm",
          entryFileNames: "[name].mjs",
        },
      ],
      plugins: [
        resolve(),
        alias({
          entries: [
            {
              find: "@neplayer",
              replacement: path.resolve(__dirname, "packages"),
            },
          ],
        }),
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
