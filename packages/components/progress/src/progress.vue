<template>
  <div class="h-4 cursor-pointer flex items-center group" ref="progressBar" @click="onProgress">
    <div class="max-w-full w-full grow box-border relative leading-[1] flex items-center " aria-valuemin="0"
      aria-valuemax="100">
      <div class="rounded-full w-full dark:bg-[rgb(55_55_55)] bg-[rgb(245,245,245)]"
        :style="{ height: `${strokeWidth}px` }">
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
</template>
<script setup lang="ts">
import { ref, watch } from "vue"
import type { ProgressEmits, ProgressProps } from "./progress"

const emit = defineEmits<ProgressEmits>()

const props = withDefaults(defineProps<ProgressProps>(), {
  strokeWidth: 3,
  duration: 1,
  color: "#dc2626",
  contactor: false,
  contactorWidth: 12,
  alwaysContactor: false,
})

const progressBar = ref<HTMLDivElement>()
const percent = ref(props.percentage)

function onProgress(e: MouseEvent) {
  if (progressBar.value) {
    const { left } = progressBar.value.getBoundingClientRect()
    const offsetWidth = Math.max(
      0,
      Math.min(e.pageX - left, progressBar.value.clientWidth)
    )
    percent.value = (offsetWidth / progressBar.value.clientWidth) * 100
    emit("onPercentChange", percent.value)
  }
}

watch(
  () => props.percentage,
  (newVal) => {
    percent.value = newVal
  }
)
</script>
