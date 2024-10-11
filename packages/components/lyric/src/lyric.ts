import type Lyric from "./lyric.vue"

export type LyricDataRow = {
  time: number
  content: string
}

export type LyricProps = {
  name?: string
  ar?: string
  lyric?: Array<LyricDataRow>
}

export type FLyricInstance = InstanceType<typeof Lyric>
