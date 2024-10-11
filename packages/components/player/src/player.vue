<template>
  <div class="ne-player">
    <slot>
      <NeMiniPlayer
        v-bind="{ picUrl: currentSong?.picUrl, name: currentSong?.name, ar: currentSong?.ar, volume: currentSong?.volume }" />
      <NeFullPlayer
        v-bind="{ picUrl: currentSong?.picUrl, name: currentSong?.name, ar: currentSong?.ar, lyric: currentSong?.lyric }" />
    </slot>
    <audio :loop="playmode === PlayModeType.SINGLE" @canplay="canplay" ref="audio"
      @loadedmetadata="playState ? audio?.play() : undefined" :src="currentSong?.url" @ended="ended"
      @timeupdate="timeupdate" />
  </div>
</template>
<script setup lang="ts">
import NeFullPlayer from "@neplayer/components/full-player"
import NeMiniPlayer from "@neplayer/components/mini-player"
import { useNePlayerStore } from "@neplayer/stores/useNePlayerStore"
import { storeToRefs } from "pinia"
import { watch } from "vue"
import { PlayModeType, type PlayerProps } from "./player"

const props = defineProps<PlayerProps>()

const playerStore = useNePlayerStore()
const { addSongs, deleteSong, clearPlaylist, getNextSong } = playerStore
const {
  playState,
  audio,
  duration,
  currentTime,
  playlist,
  playmode,
  currentSong,
} = storeToRefs(playerStore)

watch(
  () => props.playlist,
  () => {
    if (props.playlist) {
      if (Array.isArray(props.playlist)) addSongs(...props.playlist)
      else addSongs(props.playlist)
    }
  }
)

function canplay() {
  duration.value = audio.value?.duration
}

function ended() {
  currentSong.value = getNextSong("next")
}

function timeupdate() {
  currentTime.value = audio.value?.currentTime
}

defineExpose({
  playlist,
  playState,
  addSongs,
  deleteSong,
  clearPlaylist,
})
</script>
