import type MiniPlayer from "./mini-player.vue"

export type MiniPlayerProps = {
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
  /**
   * default volume
   */
  volume?: number
}

export type MiniPlayerEmits = {
  onPrevious: []
  onNext: []
  onToggle: [value: boolean]
  onPause: []
  onPlay: []
}

export type MiniPlayerInstance = InstanceType<typeof MiniPlayer>
