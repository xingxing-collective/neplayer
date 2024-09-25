import { resolve } from "node:path"
import Vue from "@vitejs/plugin-vue"
import tailwindcss from "tailwindcss"
import IconsResolver from "unplugin-icons/resolver"
import Icons from "unplugin-icons/vite"
import Components from "unplugin-vue-components/vite"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [
    Vue(),
    Icons(),
    Components({
      resolvers: [IconsResolver()],
    }),
  ],
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
