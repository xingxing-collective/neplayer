<template>
  <Transition name="neplayer-slideover">
    <div v-if="isOpen" @click="handleClose" class="ne-slideover fixed inset-0 flex z-50">
      <div class="fixed flex justify-end items-end inset-0 bottom-[--mini-player-height] md:left-28 lg:left-40 ">
        <div class="h-1/2 md:h-full lg:h-full md:w-1/2 lg:w-1/3 flex flex-col bg-background p-4" @click.stop>
          <slot></slot>
        </div>
      </div>
    </div>
  </Transition>
</template>
<script setup lang="ts">
import { onBeforeUnmount, onMounted } from "vue"

const isOpen = defineModel<boolean>({
  default: false,
})
function handleEsc(event: KeyboardEvent) {
  if (event.key === "Escape") {
    isOpen.value = false
  }
}
function handleClose() {
  isOpen.value = false
}

onMounted(() => {
  document.addEventListener("keydown", handleEsc)
})

onBeforeUnmount(() => {
  document.removeEventListener("keydown", handleEsc)
})
</script>