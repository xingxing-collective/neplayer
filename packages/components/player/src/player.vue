<template>
  <div class="ne-player">
    <NeMiniPlayer v-bind="{ picUrl, name, ar, volume }" />
    <NeFullPlayer v-bind="{ picUrl, name, ar, lyric }" />
    <audio :loop="false" @canplay="canplay" ref="audio" @loadedmetadata="playState ? audio?.play() : undefined"
      :src="url" @ended="ended" @timeupdate="timeupdate" />
  </div>
</template>
<script setup lang="ts">
import NeFullPlayer from "@neplayer/components/full-player"
import NeMiniPlayer from "@neplayer/components/mini-player"
import { useNePlayerStore } from "@neplayer/stores/useNePlayerStore"
import { storeToRefs } from "pinia"
import type { PlayerProps } from "./player"

defineProps<PlayerProps>()

const playerStore = useNePlayerStore()
const { playState, audio, duration, currentTime } = storeToRefs(playerStore)

function canplay() {
  duration.value = audio.value?.duration
}

function ended() {}

function timeupdate() {
  currentTime.value = audio.value?.currentTime
}
</script>
