import { type SFCWithInstall, withInstall } from "../../utils"
import Progress from "./src/Progress.vue"

export const NeProgress: SFCWithInstall<typeof Progress> = withInstall(Progress)

export default NeProgress

export * from "./src/Progress"
