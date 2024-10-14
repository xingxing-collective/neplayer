<template>
  <div class="ne-player">
    <slot>
      <NeMiniPlayer @on-next="onNext" @on-pause="onPause" @on-play="onPlay" @on-previous="onPrevious"
        @on-toggle="onToggle"
        v-bind="{ picUrl: currentSong?.picUrl, name: currentSong?.name, ar: currentSong?.ar, volume: currentSong?.volume }" />
      <NeFullPlayer @on-next="onNext" @on-pause="onPause" @on-play="onPlay" @on-previous="onPrevious"
        @on-toggle="onToggle"
        v-bind="{ picUrl: currentSong?.picUrl, name: currentSong?.name, ar: currentSong?.ar, lyric: currentSong?.lyric }" />
    </slot>

    <NeSlideover v-model="isOpen">
      <slot name="playlist">
        <div class="flex flex-col gap-2 h-full">
          <span class="text-xl font-black ">当前播放</span>
          <div class="flex gap-4 pt-2 items-center">
            <span class="text-sm font-semibold">共{{ currentPlaylist?.length }}首</span>
            <div class=" flex-1"></div>
            <slot name="playlistAction"></slot>
            <div class=" cursor-pointer select-none" @click="clearPlaylist"><span
                class="text-[rgb(81,126,175)] font-bold text-base">清空列表</span></div>
          </div>
          <div class="border-b dark:border-[rgb(63,63,63)] border-[rgb(242,242,242)]"></div>
          <div class="max-h-full overflow-y-auto">
            <div
              class="grid grid-cols-12 select-none gap-2 hover:bg-neutral-700 hover:cursor-pointer odd:bg-neutral-800 text-sm py-1.5 px-2"
              v-for="song in currentPlaylist">
              <div class="col-span-6 w-full flex items-center gap-2">
                <i-material-symbols-light:play-arrow v-if="song.url === currentSong?.url" width="16px" height="16px"
                  class="text-red-600" />
                <p class=" whitespace-nowrap text-ellipsis overflow-hidden">{{ song.name
                  }}</p>
              </div>
              <div class="col-span-4 w-full">
                <p class="whitespace-nowrap text-ellipsis overflow-hidden">{{ song.ar
                  }}</p>
              </div>
              <div class="col-span-2 w-full"><span>{{ $dayjs.unix(song?.duration || 0).format('mm:ss') }}</span></div>
            </div>
          </div>
        </div>
      </slot>
    </NeSlideover>
    <audio :loop="playmode === PlayModeType.SINGLE" @canplay="canplay" ref="audio"
      @loadedmetadata="playState ? audio?.play() : undefined" :src="currentSong?.url" @ended="ended"
      @timeupdate="timeupdate" />
  </div>
</template>
<script setup lang="ts">
import NeFullPlayer from "@neplayer/components/full-player"
import NeMiniPlayer from "@neplayer/components/mini-player"
import NeSlideover from "@neplayer/components/slideover"
import { useNePlayerStore } from "@neplayer/stores/useNePlayerStore"
import $dayjs from "dayjs"
import { storeToRefs } from "pinia"
import { computed, watch } from "vue"
import { PlayModeType, type PlayerProps, playerEmits } from "./player"

const props = defineProps<PlayerProps>()
const emit = defineEmits(playerEmits)

const playerStore = useNePlayerStore()
const { addSongs, deleteSong, clearPlaylist, getNextSong } = playerStore
const {
  playState,
  audio,
  currentTime,
  playlist,
  isOpen,
  playmode,
  currentSong,
  volume,
  shufflePlaylist,
} = storeToRefs(playerStore)

const currentPlaylist = computed(() => {
  return playmode.value === PlayModeType.SHUFFLE
    ? shufflePlaylist.value
    : playlist.value
})

watch(
  () => props.volume,
  (value) => {
    if (value) volume.value = value
  }
)

function canplay() {
  emit("onCanplay")
}

function onNext() {
  emit("onNext")
}

function onPause() {
  emit("onPause")
}
function onPlay() {
  emit("onPlay")
}

function onPrevious() {
  emit("onPrevious")
}

function ended() {
  currentSong.value = getNextSong("next")
  emit("onEnded")
}
function onToggle() {
  emit("onToggle", playState.value)
}

function timeupdate() {
  currentTime.value = audio.value?.currentTime
}

defineExpose({
  playlist,
  playState,
  currentSong,
  addSongs,
  deleteSong,
  clearPlaylist,
})
</script>
