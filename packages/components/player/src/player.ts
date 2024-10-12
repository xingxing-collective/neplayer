import type {
  FullPlayerEmits,
  FullPlayerProps,
} from "@neplayer/components/full-player"
import type {
  MiniPlayerEmits,
  MiniPlayerProps,
} from "@neplayer/components/mini-player"
import type Player from "./player.vue"

export type Song = MiniPlayerProps &
  FullPlayerProps & { url: string; duration?: number }

export type Playlist = Array<
  MiniPlayerProps & FullPlayerProps & { url: string; duration?: number }
>

export enum PlayModeType {
  REPEAT = 0,
  SHUFFLE = 1,
  SINGLE = 2,
}

export interface PlayerProps {
  volume?: number
}

export type PlayerEmits = {
  onCanplay: []
  onEnded: []
} & MiniPlayerEmits &
  FullPlayerEmits

export type PlayerInstance = InstanceType<typeof Player>
