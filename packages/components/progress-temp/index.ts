import { type SFCWithInstall, withInstall } from "@neplayer/utils"
import Progress from "./src/progress.vue"

export const NeProgress: SFCWithInstall<typeof Progress> = withInstall(Progress)

export default NeProgress

export * from "./src/progress"
