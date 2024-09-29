import type { LyricProps } from "@neplayer/components/lyric"
import type FullPlayer from "./full-player.vue"

export interface FullPlayerProps extends LyricProps {
  /**
   * Picture url
   */
  picUrl: string
  /**
   * Song name
   */
  name: string
  /**
   * artist name
   */
  ar: string

  /**
   * Song duration.
   * The unit of calculation is seconds.
   */
  duration: number
}

export type FullPlayerInstance = InstanceType<typeof FullPlayer>
