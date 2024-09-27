import type FullPlayer from "./FullPlayer.vue"

export type FullPlayerProps = {
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
