import { type SFCWithInstall, withInstall } from "../../utils"
import FullPlayer from "./src/FullPlayer.vue"

export const NeFullPlayer: SFCWithInstall<typeof FullPlayer> =
  withInstall(FullPlayer)

export default NeFullPlayer

export * from "./src/FullPlayer"
