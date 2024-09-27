<template>
  <div class="ne-player">
    <NeMiniPlayer v-bind="miniProps" />
    <NeFullPlayer v-bind="fullProps" />
  </div>
</template>
<script setup lang="ts">
import NeFullPlayer from "@neplayer/components/FullPlayer"
import NeMiniPlayer from "@neplayer/components/MiniPlayer"

const miniProps = {
  picUrl:
    "https://p2.music.126.net/2nH8yxLpYttZ2nqHsY0zhg==/109951168272219850.jpg?param=80y80",
  duration: 199.421,
  name: "整个冬天都是你",
  ar: "陈奕楠/knowme/艾纳德",
}

const fullProps = {
  picUrl:
    "https://p2.music.126.net/2nH8yxLpYttZ2nqHsY0zhg==/109951168272219850.jpg?param=400y400",
  duration: 199.421,
  name: "整个冬天都是你",
  ar: "陈奕楠/knowme/艾纳德",
}
</script>