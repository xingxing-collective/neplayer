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

export type FullPlayerEmits = {
  onPrevious: []
  onNext: []
  onToggle: [value: boolean]
  onPause: []
  onPlay: []
}

export type FullPlayerInstance = InstanceType<typeof FullPlayer>
