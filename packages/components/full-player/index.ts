import { type SFCWithInstall, withInstall } from "@neplayer/utils"
import FullPlayer from "./src/full-player.vue"

export const NeFullPlayer: SFCWithInstall<typeof FullPlayer> =
  withInstall(FullPlayer)

export default NeFullPlayer

export * from "./src/full-player"
