import { type SFCWithInstall, withInstall } from "../../utils"
import Player from "./src/Player.vue"

export const NePlayer: SFCWithInstall<typeof Player> = withInstall(Player)

export default NePlayer

export * from "./src/Player"
