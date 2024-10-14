import type { LyricProps } from "@neplayer/components/lyric"
import type FullPlayer from "./full-player.vue"

export interface FullPlayerProps extends LyricProps {
  /**
   * Picture url
   */
  picUrl?: string
  /**
   * Song name
   */
  name?: string
  /**
   * artist name
   */
  ar?: string
}

export const fullPlayerEmits = {
  onPrevious: () => true,
  onNext: () => true,
  onToggle: (value: boolean) => true,
  onPause: () => true,
  onPlay: () => true,
}

export type FullPlayerEmits = typeof fullPlayerEmits

export type FullPlayerInstance = InstanceType<typeof FullPlayer>
