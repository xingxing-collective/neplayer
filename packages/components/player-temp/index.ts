import { type SFCWithInstall, withInstall } from "@neplayer/utils"
import Player from "./src/player.vue"

export const NePlayer: SFCWithInstall<typeof Player> = withInstall(Player)

export default NePlayer

export * from "./src/player"
