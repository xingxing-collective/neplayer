import type { App } from "vue"
import { NeFullPlayer, NeMiniPlayer, NePlayer } from "./components"
import "./styles/index.css"
import "./styles/overrides.css"

export * from "./components"
export * from "./utils"

const install = (app: App) => {
  app.component("NeMiniPlayer", NeMiniPlayer)
  app.component("NeFullPlayer", NeFullPlayer)
  app.component("NePlayer", NePlayer)
}

export default install
