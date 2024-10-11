import type { FullPlayerProps } from "@neplayer/components/full-player"
import type { MiniPlayerProps } from "@neplayer/components/mini-player"
import type Player from "./player.vue"

export type Song = MiniPlayerProps & FullPlayerProps & { url: string }

export type Playlist = Array<
  MiniPlayerProps & FullPlayerProps & { url: string }
>

export enum PlayModeType {
  REPEAT = 0,
  SHUFFLE = 1,
  SINGLE = 2,
}

export interface PlayerProps {
  playlist?: Playlist | Song
}

export type PlayerInstance = InstanceType<typeof Player>
