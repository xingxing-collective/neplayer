<template>
  <div class=" text-[rgb(74,74,74)] dark:text-gray-200">
    <slot name="name">
      <div class="w-[70%] text-center text-2xl font-semibold">
        {{ name }}
      </div>
    </slot>
    <div class="flex w-[70%] justify-center">
      <slot name="ar">
        <div class="text-sm">歌手：</div>
        <div class="text-sm text-[rgb(81,126,175)]">{{ ar }}</div>
      </slot>
    </div>
    <div class="w-[70%] md:h-[32rem] lg:h-96">
      <div ref="container" :class="[$style.scroller, 'relative overflow-hidden h-full']">
        <div>
          <div class=" h-12" />
          <template v-for="(l, index) in lyric" :key="index">
            <slot>
              <div
                :class="[0 === index ? 'text-base dark:text-[rgb(220,221,228)] font-bold' : 'text-sm', 'mb-4 text-center']"
                ref="lyricContainer">
                {{ l.content }}
              </div>
            </slot>
          </template>
          <div class=" h-12" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import BetterScoll, { type Options } from "@better-scroll/core"
import type { BScrollConstructor } from "@better-scroll/core/dist/types/BScroll"
import MouseWheel from "@better-scroll/mouse-wheel"
import ScrollBar from "@better-scroll/scroll-bar"
import { onBeforeUnmount, onMounted, ref } from "vue"
import type { LyricProps } from "./lyric"

BetterScoll.use(ScrollBar)
BetterScoll.use(MouseWheel)

defineProps<LyricProps>()

const container = ref<HTMLDivElement>()
const scroller = ref<BScrollConstructor>()

onMounted(() => {
  scroller.value = new BetterScoll<Options>(container.value!, {
    mouseWheel: true,
    scrollY: true,
    scrollbar: true,
    probeType: 3,
    disableTouch: true,
  })
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