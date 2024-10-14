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

export const miniPlayerEmits = {
  onPrevious: () => true,
  onNext: () => true,
  onToggle: (value: boolean) => true,
  onPause: () => true,
  onPlay: () => true,
}

export type MiniPlayerEmits = typeof miniPlayerEmits

export type MiniPlayerInstance = InstanceType<typeof MiniPlayer>
