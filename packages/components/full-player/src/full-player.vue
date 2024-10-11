<template>
  <Transition name="neplayer-slide-fade">
    <div v-if="playerModeState"
      class="ne-full-player flex inset-0 fixed w-full bg-background overflow-hidden overflow-y-auto lg:z-10 md:z-50 lg:bottom-[--mini-player-height] md:bottom-0">
      <div class="max-w-full m-auto w-full h-full">
        <div class="h-16 w-full flex items-center px-2">
          <i-ri:arrow-down-s-line class="hidden md:block lg:hidden text-gray-300 cursor-pointer" width="36px"
            height="36px" @click="playerModeStateToggle()" />
        </div>
        <div class="md:flex w-full md:gap-8 lg:px-24">
          <div class="w-full md:w-1/2 lg:w-1/2 flex flex-col items-center">
            <img src="../../../assets/play-bar-support.png" class="w-8 z-20">
            <img src="../../../assets/play-bar.png"
              class="w-24 relative left-12 bottom-3 origin-[0_0] z-10 transition-all"
              :style="{ transform: !playState ? 'rotate(-30deg)' : 'inherit' }">
            <div
              class=" w-72 md:w-[20rem] lg:w-[22rem] flex justify-center items-center rounded-[50%] bg-[rgb(42,42,42)] aspect-square relative bottom-[5.25rem]">
              <div :class="$style.outer" :style="{ animationPlayState: !playState ? 'paused' : 'inherit' }">
                <img v-if="picUrl" class="rounded-[50%] w-[75%] h-[75%]" :src="picUrl" lazy="loaded" />
              </div>
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
                <span>{{ $dayjs.unix(duration || 0).format('mm:ss') }}</span>
              </div>
              <div class="grid grid-cols-5 justify-between items-center">
                <i-ic:outline-repeat v-if="playmode === PlayModeType.REPEAT" width="24px" height="24px"
                  class="cursor-pointer w-full col-span-1" />
                <i-ic:outline-shuffle v-else-if="playmode === PlayModeType.SHUFFLE" width="24px" height="24px"
                  class="cursor-pointer w-full col-span-1" />
                <i-ic:outline-repeat-one v-else width="24px" height="24px" class="cursor-pointer w-full col-span-1" />

                <i-mage:previous width="24px" height="24px"
                  class="col-span-1 w-full cursor-pointer text-[--text-color]" />
                <div @click="playStateToggle()">
                  <i-material-symbols-light:pause-circle-outline-rounded v-if="playState"
                    class="col-span-1 w-full cursor-pointer text-[--text-color]" width="60px" height="60px" />
                  <i-material-symbols-light:play-circle-outline-rounded v-else
                    class="col-span-1 w-full cursor-pointer text-[--text-color]" width="60px" height="60px" />
                </div>
                <i-mage:next width="24px" height="24px" class="col-span-1 w-full cursor-pointer text-[--text-color]" />
                <i-ri:play-list-2-line width="24px" height="24px"
                  class="col-span-1 w-full cursor-pointer text-[--text-color]" />
              </div>
            </div>
          </div>
          <NeLyric class="hidden w-1/2 md:flex lg:flex flex-col flex-1 gap-4" :name="name" :ar="ar" :lyric="lyric" />
        </div>
      </div>
    </div>
  </Transition>

</template>
<script setup lang="ts">
import NeLyric from "@neplayer/components/lyric"
import { PlayModeType } from "@neplayer/components/player"
import { NeProgress } from "@neplayer/components/progress"
import { useNePlayerStore } from "@neplayer/stores/useNePlayerStore"
import $dayjs from "dayjs"
import { storeToRefs } from "pinia"
import { computed } from "vue"
import type { FullPlayerProps } from "./full-player"

defineProps<FullPlayerProps>()

const playerStore = useNePlayerStore()
const { playerModeStateToggle, playStateToggle } = playerStore
const { playerModeState, playState, currentTime, duration, audio, playmode } =
  storeToRefs(playerStore)

const percent = computed(() => {
  if (!currentTime.value || !duration.value) return 0
  return (currentTime.value! / duration.value!) * 100
})

function onPercentChange(percent: number) {
  if (audio.value?.currentTime)
    audio.value.currentTime = (duration.value! * percent) / 100
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