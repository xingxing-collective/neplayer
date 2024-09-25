import type MiniPlayer from "./MiniPlayer.vue"

export type MiniPlayerProps = {
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

export type MiniPlayerInstance = InstanceType<typeof MiniPlayer>
