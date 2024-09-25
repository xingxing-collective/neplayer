<template>
  <div>
    <NeMiniPlayer v-bind="bind" />
    <NeFullPlayer />
  </div>
</template>
<script setup lang="ts">
const bind = {
  picUrl:
    "https://p2.music.126.net/2nH8yxLpYttZ2nqHsY0zhg==/109951168272219850.jpg?param=80y80",
  duration: 199.421,
  name: "整个冬天都是你",
  ar: "陈奕楠/knowme/艾纳德",
}
</script>