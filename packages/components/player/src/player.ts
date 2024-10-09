import type { FullPlayerProps } from "@neplayer/components/full-player"
import type { MiniPlayerProps } from "@neplayer/components/mini-player"
import type Player from "./player.vue"

export interface PlayerProps extends MiniPlayerProps, FullPlayerProps {
  url: string
}

export type PlayerInstance = InstanceType<typeof Player>
