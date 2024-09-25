import type { App } from "vue"
import { NeFullPlayer, NeMiniPlayer } from "./components"
import "./styles/index.css"
import { createPinia } from "pinia"

export * from "./components"
export * from "./utils"

const pinia = createPinia()

const install = (app: App) => {
  app.component("NeMiniPlayer", NeMiniPlayer)
  app.component("NeFullPlayer", NeFullPlayer)
  app.use(pinia)
}

export default install
