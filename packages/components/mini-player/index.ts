import { type SFCWithInstall, withInstall } from "@neplayer/utils"
import MiniPlayer from "./src/mini-player.vue"

export const NeMiniPlayer: SFCWithInstall<typeof MiniPlayer> =
  withInstall(MiniPlayer)

export default NeMiniPlayer

export * from "./src/mini-player"
