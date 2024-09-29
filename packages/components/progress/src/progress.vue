<template>
  <div class="h-3 cursor-pointer flex items-center" @click="onProgress">
    <div @click.stop class="max-w-full w-full relative group leading-[1] flex items-center " aria-valuemin="0"
      aria-valuemax="100">
      <div class="grow box-border">
        <div class="rounded-full dark:bg-[rgb(55_55_55)] bg-[rgb(245,245,245)]" :style="{ height: `${strokeWidth}px` }">
          <div
            class="absolute left-0 top-0 h-full text-right rounded-full 
          leading-[1] whitespace-nowrap transition-[width_0.6s_ease] after:inline-block after:content-none  after:h-full after:align-middle"
            :style="{ width: `${percent}%`, animationDirection: `${duration}s`, backgroundColor: color }"></div>
          <div
            :class="[contactor ? (alwaysContactor ? 'block' : 'hidden group-hover:block') : '', ' absolute box-border rounded-[50%]']"
            :style="{
              backgroundColor: color,
              width: `${contactorWidth}px`,
              height: `${contactorWidth}px`,
              top: `-${(contactorWidth - strokeWidth) / 2}px`,
              left: `${percent}%`,
              transform: `translate3d(${percent},0,0)`
            }">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue"
import type { ProgressProps } from "./progress"

const props = withDefaults(defineProps<ProgressProps>(), {
  strokeWidth: 3,
  duration: 1,
  color: "#dc2626",
  contactor: false,
  contactorWidth: 12,
})

const percent = ref(props.percentage)

function onProgress(e: MouseEvent) {
  e.preventDefault()
  const ele = e.target as HTMLDivElement
  const { left } = ele.getBoundingClientRect()
  const offsetWidth = Math.max(0, Math.min(e.pageX - left, ele.clientWidth))
  percent.value = (offsetWidth / ele.clientWidth) * 100
}
</script>
