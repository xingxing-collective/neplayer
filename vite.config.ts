import dayjs from "dayjs"
import { defineConfig } from "vite"

export default defineConfig(({ mode }) => {
  return {
    define: {
      __BUILD_TIME__: JSON.stringify(dayjs().format("YYYY/MM/DD HH:mm")),
    },
  }
})
