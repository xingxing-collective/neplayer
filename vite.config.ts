import { resolve } from "node:path"
import dayjs from "dayjs"
import { defineConfig } from "vite"

export default defineConfig(() => {
  return {
    build: {
      lib: {
        entry: resolve(__dirname, "src/neplayer/index.ts"),
        name: "neplayer",
      },
    },
    define: {
      __BUILD_TIME__: JSON.stringify(dayjs().format("YYYY/MM/DD HH:mm")),
    },
  }
})
