import { useToggle } from "@vueuse/core"
import { defineStore } from "pinia"

export const usePlayerStore = defineStore("player", () => {
  const [playerModeState, playerModeStateToggle] = useToggle(false)
  return {
    playerModeState,
    playerModeStateToggle,
  }
})
