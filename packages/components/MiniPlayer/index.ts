import { type SFCWithInstall, withInstall } from "../../utils"
import MiniPlayer from "./src/MiniPlayer.vue"

export const NeMiniPlayer: SFCWithInstall<typeof MiniPlayer> =
  withInstall(MiniPlayer)

export default NeMiniPlayer

export * from "./src/MiniPlayer"
