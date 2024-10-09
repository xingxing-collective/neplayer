import type MiniPlayer from "./mini-player.vue"

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

  volume?: number
}

export type MiniPlayerInstance = InstanceType<typeof MiniPlayer>
