<template>
  <div class=" text-[rgb(74,74,74)] dark:text-gray-200 w-full h-full">
    <slot name="name">
      <div v-if="name" class="w-full text-center text-2xl font-semibold">
        {{ name }}
      </div>
    </slot>
    <div class="flex w-full justify-center">
      <slot name="ar">
        <div v-if="ar" class="text-sm">歌手：</div>
        <div class="text-sm text-[rgb(81,126,175)]">{{ ar }}</div>
      </slot>
    </div>
    <div class="w-full h-[80%]">
      <slot>
        <div ref="container" v-if="lyric" :class="[$style.scroller, 'relative overflow-hidden h-full']">
          <div>
            <div class=" h-12" />
            <template v-for="(l, index) in lyric" :key="index">
              <div
                :class="[currentLyricIndex === index ? 'text-base dark:text-[rgb(220,221,228)] font-bold' : 'text-sm', 'mb-4 text-center']"
                ref="lyricContainer">
                {{ l.content }}
              </div>
            </template>
            <div class=" h-12" />
          </div>
        </div>
      </slot>
    </div>
  </div>
</template>
<script setup lang="ts">
import BetterScoll, { type Options } from "@better-scroll/core"
import type { BScrollConstructor } from "@better-scroll/core/dist/types/BScroll"
import MouseWheel from "@better-scroll/mouse-wheel"
import ScrollBar from "@better-scroll/scroll-bar"
import { useNePlayerStore } from "@neplayer/stores/useNePlayerStore"
import { storeToRefs } from "pinia"
import {
  computed,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  shallowRef,
  watch,
} from "vue"
import type { LyricProps } from "./lyric"

BetterScoll.use(ScrollBar)
BetterScoll.use(MouseWheel)

const props = defineProps<LyricProps>()
const playerStore = useNePlayerStore()
const { currentTime, playerModeState } = storeToRefs(playerStore)

const container = ref<HTMLDivElement>()
const lyricContainer = shallowRef<Array<HTMLDivElement>>()
const scroller = ref<BScrollConstructor>()

const currentLyricIndex = computed(() => {
  return (
    props.lyric?.findIndex((l, index) => {
      const nextLyric = props.lyric?.at(index + 1)
      return (
        currentTime.value! >= l.time &&
        (nextLyric ? currentTime.value! < nextLyric.time : true)
      )
    }) || -1
  )
})

watch(currentLyricIndex, (newIndex, oldIndex) => {
  if (newIndex !== oldIndex && newIndex !== -1 && playerModeState.value) {
    nextTick(() => {
      if (lyricContainer.value)
        scroller.value?.scrollToElement(
          lyricContainer.value[newIndex],
          300,
          0,
          true
        )
    })
  }
})

onMounted(() => {
  if (container.value) {
    scroller.value = new BetterScoll<Options>(container.value, {
      mouseWheel: true,
      scrollY: true,
      scrollbar: true,
      probeType: 3,
      disableTouch: true,
    })
  }
})

onBeforeUnmount(() => {
  scroller.value?.destroy()
})
</script>
<style scoped module>
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