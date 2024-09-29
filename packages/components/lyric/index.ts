import { type SFCWithInstall, withInstall } from "@neplayer/utils"
import Lyric from "./src/lyric.vue"

export const NeLyric: SFCWithInstall<typeof Lyric> = withInstall(Lyric)

export default NeLyric

export * from "./src/lyric"
