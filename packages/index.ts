import type { App } from "vue"
import { NeMiniPlayer } from "./components"

export * from "./components"
export * from "./utils"

const install = (app: App) => {
  app.component("NeMiniPlayer", NeMiniPlayer)
}

export default install
