<template>
  <div>
    Full Player {{ playerModeState }}
  </div>
</template>
<script setup lang="ts">
import { usePlayerStore } from "@neplayer/stores/usePlayerStore"
import { storeToRefs } from "pinia"

const playerStore = usePlayerStore()
const { playerModeState } = storeToRefs(playerStore)
</script>