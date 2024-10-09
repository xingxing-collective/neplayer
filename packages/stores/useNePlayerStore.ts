import { useToggle } from "@vueuse/core"
import { defineStore } from "pinia"
import { ref, watch } from "vue"

export const useNePlayerStore = defineStore("player", () => {
  const audio = ref<HTMLAudioElement>()
  const duration = ref<number>()
  const currentTime = ref<number>()

  const volume = ref<number>(0.4)

  const [playerModeState, playerModeStateToggle] = useToggle(false)
  const [playState, playStateToggle] = useToggle(false)

  watch(volume, (newVal) => {
    if (audio.value?.volume) audio.value.volume = newVal
  })

  watch(playState, (newVal) => {
    if (newVal) {
      audio.value?.play()
    } else {
      audio.value?.pause()
    }
  })

  return {
    audio,
    duration,
    currentTime,
    volume,
    playState,
    playStateToggle,
    playerModeState,
    playerModeStateToggle,
  }
})
