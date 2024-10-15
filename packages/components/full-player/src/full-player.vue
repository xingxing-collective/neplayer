<template>
  <Transition name="neplayer-slide-fade">
    <div v-if="playerModeState"
      class="ne-full-player flex inset-0 fixed w-full bg-background overflow-hidden overflow-y-auto lg:z-10 z-50 lg:bottom-[--mini-player-height] bottom-0">
      <div class="max-w-full m-auto w-full h-full hidden md:block lg:block">
        <div class="h-16 w-full flex items-center px-2">
          <i-ri-arrow-down-s-line class="hidden md:block lg:hidden text-gray-300 cursor-pointer" width="36px"
            height="36px" @click="playerModeStateToggle()" />
        </div>
        <div class="md:flex w-full md:gap-8 lg:px-24 h-[80%]">
          <div class="w-full md:w-1/2 lg:w-1/2 flex flex-col items-center">
            <img src="../../../assets/play-bar-support.png" class="w-8 z-20">
            <img src="../../../assets/play-bar.png"
              class="w-24 relative left-12 bottom-3 origin-[0_0] z-10 transition-all"
              :style="{ transform: !playState ? 'rotate(-30deg)' : 'inherit' }">
            <div
              class=" w-72 md:w-[20rem] lg:w-[22rem] flex justify-center items-center rounded-[50%] bg-[rgb(42,42,42)] aspect-square relative bottom-[5.25rem]">
              <KeepAlive>
                <div :class="$style.outer" :style="{ animationPlayState: !playState ? 'paused' : 'inherit' }">
                  <img v-if="picUrl" class="rounded-[50%] w-[75%] h-[75%]" :src="picUrl" lazy="loaded" />
                </div>
              </KeepAlive>
            </div>
            <div class="hidden md:flex flex-col lg:hidden md:w-[20rem] gap-2 relative bottom-8">
              <div class="grid grid-cols-5 justify-between items-center">
                <slot name="action"></slot>
              </div>
              <div class="flex items-center text-[11px] dark:text-gray-500 px-4 pt-4 gap-2">
                <span>{{ $dayjs.unix(currentTime || 0).format('mm:ss') }}</span>
                <div class="flex-1">
                  <NeProgress :contactor="true" :always-contactor="false" :percentage="percent"
                    @percent-change="onPercentChange" />
                </div>
                <span>{{ $dayjs.unix(currentSong?.duration || 0).format('mm:ss') }}</span>
              </div>
              <div class="grid grid-cols-5 justify-between items-center">
                <div @click="() => playmode < 2 ? playmode++ : playmode = 0">
                  <i-ic-outline-repeat v-if="playmode === PlayModeType.REPEAT" width="24px" height="24px"
                    class="cursor-pointer w-full col-span-1" />
                  <i-ic-outline-shuffle v-else-if="playmode === PlayModeType.SHUFFLE" width="24px" height="24px"
                    class="cursor-pointer w-full col-span-1" />
                  <i-ic-outline-repeat-one v-else width="24px" height="24px" class="cursor-pointer w-full col-span-1" />
                </div>
                <i-mage-previous @click="onPrevious()" width="24px" height="24px"
                  class="col-span-1 w-full cursor-pointer text-[--text-color]" />
                <div @click="onToggle()">
                  <i-material-symbols-light-pause-circle-outline-rounded v-if="playState"
                    class="col-span-1 w-full cursor-pointer text-[--text-color]" width="60px" height="60px" />
                  <i-material-symbols-light-play-circle-outline-rounded v-else
                    class="col-span-1 w-full cursor-pointer text-[--text-color]" width="60px" height="60px" />
                </div>
                <i-mage-next @click="onNext()" width="24px" height="24px"
                  class="col-span-1 w-full cursor-pointer text-[--text-color]" />
                <i-ri-play-list2-line @click="isOpen = !isOpen" width="24px" height="24px"
                  class="col-span-1 w-full cursor-pointer text-[--text-color]" />
              </div>
            </div>
          </div>
          <NeLyric class="hidden w-1/2 md:flex lg:flex flex-col flex-1 gap-4" :name="name" :ar="ar" :lyric="lyric" />
        </div>
      </div>
      <div class="flex flex-col md:hidden lg:hidden w-full h-full px-4">
        <div class="h-16 w-full flex items-center px-2">
          <i-ri-arrow-down-s-line class="block text-gray-300 cursor-pointer" width="36px" height="36px"
            @click="playerModeStateToggle()" />
        </div>
        <div class="h-[65%]" @click="lyricStateToggle()" v-if="lyricState">
          <div class="flex flex-col items-center">
            <img src="../../../assets/play-bar-support.png" class="w-8 z-20">
            <img src="../../../assets/play-bar.png"
              class="w-24 relative left-12 bottom-3 origin-[0_0] z-10 transition-all"
              :style="{ transform: !playState ? 'rotate(-30deg)' : 'inherit' }">
            <div
              class=" w-[85%] flex justify-center items-center rounded-[50%] bg-[rgb(42,42,42)] aspect-square relative bottom-[5.25rem]">
              <KeepAlive>
                <div :class="$style.outer" :style="{ animationPlayState: !playState ? 'paused' : 'inherit' }">
                  <img v-if="picUrl" class="rounded-[50%] w-[75%] h-[75%]" :src="picUrl" lazy="loaded" />
                </div>
              </KeepAlive>
            </div>
          </div>
          <div class="flex">
            <div class="flex flex-col">
              <span class="text-black dark:text-white text-lg">{{ name }}</span>
              <span>{{ ar }}</span>
            </div>
            <div class="flex-1" />
          </div>
        </div>
        <div class="h-[65%] w-full" @click="lyricStateToggle()" v-else>
          <NeLyric :name="name" :ar="ar" :lyric="lyric" />
        </div>
        <div class="w-full flex flex-col">
          <NeProgress :contactor="true" :always-contactor="false" :percentage="percent"
            @percent-change="onPercentChange" />
          <div class="w-full flex">
            <span>{{ $dayjs.unix(currentTime || 0).format('mm:ss') }}</span>
            <div class="flex-1" />
            <span>{{ $dayjs.unix(currentSong?.duration || 0).format('mm:ss') }}</span>
          </div>
        </div>
        <div class="grid grid-cols-5 justify-between items-center">
          <slot name="action"></slot>
        </div>
        <div class="grid grid-cols-5 justify-between items-center gap-2">
          <div class="cursor-pointer w-full col-span-1" @click="() => playmode < 2 ? playmode++ : playmode = 0">
            <i-ic-outline-repeat v-if="playmode === PlayModeType.REPEAT" width="32px" height="32px" />
            <i-ic-outline-shuffle v-else-if="playmode === PlayModeType.SHUFFLE" width="32px" height="32px" />
            <i-ic-outline-repeat-one v-else width="32px" height="32px" />
          </div>
          <i-mage-previous @click="onPrevious()" width="32px" height="32px"
            class="col-span-1 w-full cursor-pointer text-[--text-color]" />
          <div class="col-span-1 w-full cursor-pointer text-[--text-color]" @click="onToggle()">
            <i-material-symbols-light-pause-circle-outline-rounded v-if="playState" width="80px" height="80px" />
            <i-material-symbols-light-play-circle-outline-rounded v-else width="80px" height="80px" />
          </div>
          <i-mage-next @click="onNext()" width="32px" height="32px"
            class="col-span-1 w-full cursor-pointer text-[--text-color]" />
          <div class="col-span-1 w-full cursor-pointer text-[--text-color] flex justify-end">
            <i-ri-play-list2-line @click="isOpen = !isOpen" width="32px" height="32px" />
          </div>
        </div>
      </div>
    </div>
  </Transition>

</template>
<script setup lang="ts">
import IIcOutlineRepeat from "virtual:icons/ic/outline-repeat"
import IIcOutlineRepeatOne from "virtual:icons/ic/outline-repeat-one"
import IIcOutlineShuffle from "virtual:icons/ic/outline-shuffle"
import IMageNext from "virtual:icons/mage/next"
import IMagePrevious from "virtual:icons/mage/previous"
import IMaterialSymbolsLightPauseCircleOutlineRounded from "virtual:icons/material-symbols-light/pause-circle-outline-rounded"
import IMaterialSymbolsLightPlayCircleOutlineRounded from "virtual:icons/material-symbols-light/play-circle-outline-rounded"
import IRiArrowDownSLine from "virtual:icons/ri/arrow-down-s-line"
import IRiPlayList2Line from "virtual:icons/ri/play-list-2-line"
import NeLyric from "@neplayer/components/lyric"
import { PlayModeType } from "@neplayer/components/player"
import { NeProgress } from "@neplayer/components/progress"
import { useNePlayerStore } from "@neplayer/stores/useNePlayerStore"
import { useToggle } from "@vueuse/core"
import $dayjs from "dayjs"
import { storeToRefs } from "pinia"
import { computed } from "vue"
import { type FullPlayerProps, fullPlayerEmits } from "./full-player"

defineProps<FullPlayerProps>()
const emit = defineEmits(fullPlayerEmits)

const [lyricState, lyricStateToggle] = useToggle(true)
const playerStore = useNePlayerStore()
const { playerModeStateToggle, playStateToggle, getNextSong } = playerStore
const {
  playerModeState,
  playState,
  currentTime,
  isOpen,
  audio,
  playmode,
  currentSong,
} = storeToRefs(playerStore)

function onToggle() {
  playStateToggle()
  emit("onToggle", playState.value)
  if (playState.value) {
    emit("onPlay")
  } else {
    emit("onPause")
  }
}

function onPrevious() {
  currentSong.value = getNextSong("prev")

  emit("onPrevious")
  if (!playState.value) {
    onToggle()
  }
}

function onNext() {
  currentSong.value = getNextSong("next")

  emit("onNext")
  if (!playState.value) {
    onToggle()
  }
}

const percent = computed(() => {
  if (!currentTime.value || currentSong.value?.duration) return 0
  return (currentTime.value! / currentSong.value?.duration!) * 100
})

function onPercentChange(percent: number) {
  if (audio.value?.currentTime)
    audio.value.currentTime = (currentSong.value?.duration || 0 * percent) / 100
}
</script>
<style scoped module>
@keyframes rotate {
  0% {
    transform: rotate(0);
  }

  100% {
    transform: rotate(1turn);
  }
}

.outer {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90%;
  height: 90%;
  border-radius: 50%;
  background: linear-gradient(-45deg, #333540, #070708, #333540);
  animation: rotate 20s linear infinite;
}

.scroller {
  mask-image: linear-gradient(180deg,
      hsla(0, 0%, 100%, 0) 0,
      hsla(0, 0%, 100%, 0.6) 15%,
      #fff 25%,
      #fff 75%,
      hsla(0, 0%, 100%, 0.6) 85%,
      hsla(0, 0%, 100%, 0));
}
</style>