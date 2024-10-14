<template>
  <div
    class="ne-mini-player fixed bottom-0 z-20 w-full h-[--mini-player-height] left-0 right-0 flex pr-4 backdrop-blur-md shadow-md  bg-opacity-50">
    <div class="hidden md:grid lg:grid grid-cols-5 p-[0.5rem_1rem] w-full justify-between items-center overflow-hidden">
      <div class="col-span-2 flex w-full">
        <div class="relative rounded-md overflow-hidden cursor-pointer w-14">
          <div class="absolute left-0 right-0 top-0 bottom-0 bg-[rgba(0,0,0,.2)]"></div>
          <img lazy="loaded" v-if="picUrl" :src="picUrl" class="blur-sm w-full h-full" />
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
            <span>{{ $dayjs.unix(currentTime || 0).format('mm:ss') }}</span><span>/</span><span>{{
              $dayjs.unix(currentSong?.duration
                ||
                0).format('mm:ss') }}</span>
          </div>
        </div>
      </div>
      <div class="col-span-1 w-full flex justify-center flex-1 gap-6 items-center">
        <slot>
          <i-ic:round-skip-previous @click="onPrevious()" width="36px" height="36px"
            class="text-red-600 cursor-pointer" />
          <div class="bg-red-600 rounded-[50%] h-12 w-12 flex items-center justify-center cursor-pointer"
            @click="onToggle()">
            <i-ic:baseline-pause v-if="playState" class="text-white" width="28px" height="28px" />
            <i-ic:baseline-play-arrow v-else class="text-white" width="28px" height="28px" />
          </div>
          <i-ic:round-skip-next @click="onNext()" width="36px" height="36px" class="text-red-600 cursor-pointer" />
        </slot>
      </div>
      <div class="col-span-2 w-full flex items-center gap-6 lg:gap-8 px-4">
        <div class="flex-1" />
        <slot name="action"></slot>
        <div class="flex h-full items-center gap-4" @click="() => playmode < 2 ? playmode++ : playmode = 0">
          <i-ic:outline-repeat v-if="playmode === PlayModeType.REPEAT" width="24px" height="24px"
            class="text-[--text-color] cursor-pointer" />
          <i-ic:outline-shuffle v-else-if="playmode === PlayModeType.SHUFFLE" width="24px" height="24px"
            class="text-[--text-color] cursor-pointer" />
          <i-ic:outline-repeat-one v-else width="24px" height="24px" class="text-[--text-color] cursor-pointer" />
        </div>
        <div class="flex h-full items-center gap-4" @click="isOpen = !isOpen">
          <i-ri:play-list-2-line width="24px" height="24px" class="text-[--text-color] cursor-pointer" />
        </div>
        <div class="flex lg:grid lg:grid-cols-4 h-full items-center gap-2 lg:w-40 md:hidden">
          <i-ri:volume-up-line width="24px" height="24px" class="text-[--text-color] cursor-pointer col-span-1" />
          <NeProgress :duration="0" @percent-change="onVolumeChange" :contactor="false" :always-contactor="true"
            :percentage="props.volume" class="col-span-3" />
        </div>
      </div>
    </div>
    <div v-if="!playerModeState" class="hidden md:block lg:block fixed w-full bottom-[3.5rem] z-30">
      <NeProgress :percentage="percent" :contactor="true" :always-contactor="false" @percent-change="onPercentChange" />
    </div>
    <div class="grid grid-cols-10 px-4 gap-1 md:hidden lg:hidden h-full w-full">
      <div class="col-span-2 w-full flex items-center" @click="playerModeStateToggle()" >
        <div class="w-12 flex justify-center items-center rounded-[50%] bg-[rgb(42,42,42)] aspect-square">
          <div :class="$style.outer" :style="{ animationPlayState: !playState ? 'paused' : 'inherit' }">
            <img v-if="picUrl" class="rounded-[50%] w-[75%] h-[75%]" :src="picUrl" lazy="loaded" />
          </div>
        </div>
      </div>
      <div class="col-span-5 flex items-center w-full" @click="playerModeStateToggle()">
        <p class="truncate text-[--text-color]">
          <span class="text-black dark:text-white">{{ name }}</span>-
          {{ ar }}
        </p>
      </div>
      <div class="flex-1 col-span-3 grid grid-cols-2 items-center">
        <div @click="onToggle()" class="w-full col-span-1 text-[--text-color] flex justify-center">
          <i-ic:baseline-pause v-if="playState" class="cursor-pointer " width="28px" height="28px" />
          <i-ic:baseline-play-arrow v-else class="cursor-pointer" width="28px" height="28px" />
        </div>
        <div @click="isOpen = !isOpen" class="cursor-pointer w-full col-span-1 text-[--text-color] flex justify-center">
          <i-ri:play-list-2-line width="24px" height="24px" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { PlayModeType } from "@neplayer/components/player"
import { NeProgress } from "@neplayer/components/progress"
import { useNePlayerStore } from "@neplayer/stores/useNePlayerStore"
import $dayjs from "dayjs"
import { storeToRefs } from "pinia"
import { computed } from "vue"
import { type MiniPlayerProps, miniPlayerEmits } from "./mini-player"

const props = withDefaults(defineProps<MiniPlayerProps>(), {
  volume: 40,
})

const emit = defineEmits(miniPlayerEmits)

const playerStore = useNePlayerStore()
const { playerModeStateToggle, playStateToggle, getNextSong } = playerStore
const {
  playerModeState,
  playState,
  currentTime,
  volume,
  audio,
  playmode,
  currentSong,
  isOpen,
} = storeToRefs(playerStore)

const percent = computed(() => {
  if (!currentTime.value || !currentSong.value?.duration) return 0
  return (currentTime.value! / currentSong.value?.duration) * 100
})

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

function onPercentChange(percent: number) {
  if (audio.value?.currentTime)
    audio.value.currentTime = (currentSong.value?.duration || 0 * percent) / 100
}

function onVolumeChange(percent: number) {
  volume.value = percent / 100
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