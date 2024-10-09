<template>
  <div
    class="ne-mini-player fixed bottom-0 z-20 w-full h-[--mini-player-height] left-0 right-0 flex p-[0.5rem_1rem] pr-6 backdrop-blur-md shadow-md  bg-opacity-50">
    <div class="hidden md:grid lg:grid grid-cols-5 w-full justify-between items-center overflow-hidden">

      <div class="col-span-2 flex w-full">
        <div class="relative rounded-md overflow-hidden cursor-pointer w-14">
          <div class="absolute left-0 right-0 top-0 bottom-0 bg-[rgba(0,0,0,.2)]"></div>
          <img lazy="loaded" :src="picUrl" class="blur-sm w-full h-full" />
          <div class="absolute w-full h-full top-0 flex flex-col items-center justify-center cursor-pointer"
            @click="playerModeStateToggle()">
            <i-ri:arrow-up-s-line v-if="!playerModeState" class="text-gray-100 top-[1px]" width="22px" height="22px" />
            <i-ri:arrow-down-s-line class="text-gray-100 bottom-[1px]" width="22px" height="22px" />
            <i-ri:arrow-up-s-line v-if="playerModeState" class="text-gray-100 top-[1px]" width="22px" height="22px" />
          </div>
        </div>
        <div class="flex flex-col w-full pl-2">
          <div class="flex h-1/2 items-center gap-[2px]">
            <div class="text-sm">{{ name }}</div>
            <div class="text-[--text-color]">-</div>
            <div class="text-[0.75rem] text-[--text-color]">{{ ar }}</div>
          </div>
          <div class="h-1/2 flex items-center text-[11px] dark:text-gray-500">
            <span>{{ $dayjs.unix(currentTime || 0).format('mm:ss') }}</span><span>/</span><span>{{ $dayjs.unix(duration
              ||
              0).format('mm:ss') }}</span>
          </div>
        </div>
      </div>
      <div class="col-span-1 w-full flex justify-center flex-1 gap-6 items-center">
        <i-ic:round-skip-previous width="36px" height="36px" class="text-red-600 cursor-pointer" />
        <div class="bg-red-600 rounded-[50%] h-12 w-12 flex items-center justify-center cursor-pointer"
          @click="playStateToggle()">
          <i-ic:baseline-pause v-if="playState" class="text-white" width="28px" height="28px" />
          <i-ic:baseline-play-arrow v-else class="text-white" width="28px" height="28px" />
        </div>
        <i-ic:round-skip-next width="36px" height="36px" class="text-red-600 cursor-pointer" />
      </div>
      <div class="col-span-2 w-full flex items-center gap-6 lg:gap-8 px-4">
        <div class="flex-1" />
        <slot></slot>
        <div class="flex h-full items-center gap-4">
          <i-ic:outline-repeat width="24px" height="24px" class="text-[--text-color] cursor-pointer" />
        </div>
        <div class="flex h-full items-center gap-4">
          <i-ri:play-list-2-line width="24px" height="24px" class="text-[--text-color] cursor-pointer" />
        </div>
        <div class="flex lg:grid lg:grid-cols-4 h-full items-center gap-2 lg:w-40 md:hidden">
          <i-ri:volume-up-line width="24px" height="24px" class="text-[--text-color] cursor-pointer col-span-1" />
          <NeProgress :duration="0" @percent-change="onVolumeChange" :contactor="false" :always-contactor="true"
            :percentage="props.volume" class="col-span-3" />
        </div>
      </div>
    </div>
    <div class="absolute w-full bottom-[3.5rem]">
      <NeProgress :percentage="percent" :contactor="true" :always-contactor="false" @percent-change="onPercentChange" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { NeProgress } from "@neplayer/components/progress"
import { useNePlayerStore } from "@neplayer/stores/useNePlayerStore"
import $dayjs from "dayjs"
import { storeToRefs } from "pinia"
import { computed } from "vue"
import type { MiniPlayerProps } from "./mini-player"

const props = withDefaults(defineProps<MiniPlayerProps>(), {
  volume: 40,
})

const playerStore = useNePlayerStore()
const { playerModeStateToggle, playStateToggle } = playerStore
const { playerModeState, playState, duration, currentTime, volume, audio } =
  storeToRefs(playerStore)

const percent = computed(() => {
  if (!currentTime.value || !duration.value) return 0
  return (currentTime.value! / duration.value!) * 100
})

function onPercentChange(percent: number) {
  if (audio.value?.currentTime)
    audio.value.currentTime = (duration.value! * percent) / 100
}

function onVolumeChange(percent: number) {
  volume.value = percent / 100
}
</script>