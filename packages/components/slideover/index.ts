import { type SFCWithInstall, withInstall } from "@neplayer/utils"
import Slideover from "./src/slideover.vue"

export const NeSlideover: SFCWithInstall<typeof Slideover> =
  withInstall(Slideover)

export default NeSlideover

export * from "./src/slideover"
