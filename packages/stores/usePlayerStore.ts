import { useToggle } from "@vueuse/core"
import { defineStore } from "pinia"

export const usePlayerStore = defineStore("player", () => {
  const [playerModeState, playerModeStateToggle] = useToggle(false)
  const [playState, playStateToggle] = useToggle(false)

  return {
    playState,
    playStateToggle,
    playerModeState,
    playerModeStateToggle,
  }
})
