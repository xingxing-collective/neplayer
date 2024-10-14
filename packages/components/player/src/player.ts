import type { FullPlayerProps } from "@neplayer/components/full-player"
import type { MiniPlayerProps } from "@neplayer/components/mini-player"
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

export const playerEmits = {
  onCanplay: () => true,
  onEnded: () => true,
  onPrevious: () => true,
  onNext: () => true,
  onToggle: (value: boolean) => true,
  onPause: () => true,
  onPlay: () => true,
}

export type PlayerEmits = typeof playerEmits

export type PlayerInstance = InstanceType<typeof Player>
