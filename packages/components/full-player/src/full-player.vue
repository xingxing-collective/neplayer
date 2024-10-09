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
                <img class="rounded-[50%] w-[75%] h-[75%]" :src="picUrl" lazy="loaded" />
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
import { useNePlayerStore } from "@neplayer/stores/useNePlayerStore"
import { storeToRefs } from "pinia"
import type { FullPlayerProps } from "./full-player"

defineProps<FullPlayerProps>()

const playerStore = useNePlayerStore()
const { playerModeStateToggle } = playerStore
const { playerModeState, playState } = storeToRefs(playerStore)
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