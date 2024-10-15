import { resolve } from "node:path"
import vue from "@vitejs/plugin-vue"
import Icons from "unplugin-icons/vite"
import { defineConfig } from "vite"

// https://vitejs.dev/config/
export default defineConfig(async () => {
  return {
    plugins: [vue(), Icons()],
    resolve: {
      alias: [
        {
          find: "neplayer",
          replacement: resolve(__dirname, "..", "packages"),
        },
        {
          find: "@neplayer",
          replacement: resolve(__dirname, "..", "packages/"),
        },
      ],
    },
  }
})
