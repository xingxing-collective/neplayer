<template>
  <div>
    <NePlayer v-bind="foo" />
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue"

const foo = ref()

onMounted(async () => {
  const response = await fetch(
    "https://xingxing-music-api.vercel.app/song/url/v1?id=2018096932&level=exhigh&realIP=116.25.146.177"
  ).then((res) => res.json())
  console.log(response)
  foo.value = {
    url: response.data[0].url,
    picUrl:
      "https://p2.music.126.net/2nH8yxLpYttZ2nqHsY0zhg==/109951168272219850.jpg?param=400y400",
    name: "整个冬天都是你",
    ar: "陈奕楠/knowme/艾纳德",
    lyric: [
      {
        time: 0,
        content: " 混音 : Sako8",
      },
      {
        time: 1,
        content: " 作词 : 陈奕楠/knowme/艾纳德",
      },
      {
        time: 2,
        content: " 作曲 : 陈奕楠/knowme/艾纳德",
      },
      {
        time: 3,
        content: " 编曲 : 张几",
      },
      {
        time: 4,
        content: " 制作人 : knowme",
      },
      {
        time: 24,
        content: "艾纳德：",
      },
      {
        time: 24,
        content: "在这个没有你的冬天感觉好冷",
      },
      {
        time: 27,
        content: "都在劝我放弃你说没有什么好等",
      },
      {
        time: 29,
        content: "可能是我不懂怎么去挽留",
      },
      {
        time: 31,
        content: "眼睁睁看着你转头",
      },
      {
        time: 32,
        content: "是的全部都怪在我比较笨",
      },
      {
        time: 34,
        content: "不习惯手机再没有你的消息",
      },
      {
        time: 37,
        content: "一个人的房间陪我的只有焦虑",
      },
      {
        time: 39,
        content: "你怎么可以这么狠心的把我给抛弃",
      },
      {
        time: 42,
        content: "我的心里只容得下你因为我挑剔",
      },
      {
        time: 44,
        content: "那天我其实只是想看到你点头",
      },
      {
        time: 47,
        content: "想回到那天在小巷羞涩和你牵手",
      },
      {
        time: 50,
        content: "等到今天最后却只望着你远走",
      },
      {
        time: 52,
        content: "留下的那张合照现在也已变旧",
      },
      {
        time: 55,
        content: " so baby come back come back now",
      },
      {
        time: 57,
        content: "我想要你再次回到我的怀抱",
      },
      {
        time: 59,
        content: "我明白以前的我到底多么可笑",
      },
      {
        time: 62,
        content: "我答应你要比以前更加的可靠",
      },
      {
        time: 64,
        content: "陈奕楠：",
      },
      {
        time: 64,
        content: "这没你的冬天格外寂寞",
      },
      {
        time: 69,
        content: "与你的回忆够我留恋好久",
      },
      {
        time: 74,
        content: "也许我糊涂了",
      },
      {
        time: 76,
        content: "慌乱又无措了",
      },
      {
        time: 79,
        content: "奢望着你会停留",
      },
      {
        time: 84,
        content: "这一场雪刚好落在心头",
      },
      {
        time: 89,
        content: "这清冷季节怎么过得这么久",
      },
      {
        time: 94,
        content: "就找个借口",
      },
      {
        time: 96,
        content: "找个合适理由",
      },
      {
        time: 99,
        content: "不至于让自己",
      },
      {
        time: 102,
        content: "失了控",
      },
      {
        time: 105,
        content: " knowme：",
      },
      {
        time: 105,
        content: "我不好意思 bad babe我心化成没结完的冰",
      },
      {
        time: 108,
        content: "我记得牵你手的时候好像粘人的病",
      },
      {
        time: 110,
        content: "你躺我怀里让我抱你 baby give me the kiss",
      },
      {
        time: 113,
        content: "是你的挑剔使我焦虑让我没有了力",
      },
      {
        time: 115,
        content: "我喜欢背后蒙你眼睛是谁抓住你",
      },
      {
        time: 118,
        content: "我没能等到你的消息 i call it love maybe",
      },
      {
        time: 120,
        content: "我真的没想离开 cause youdon't believe",
      },
      {
        time: 123,
        content: "我真的动心不是让你 make love with me",
      },
      {
        time: 126,
        content: "头顶上的雪花飞过我",
      },
      {
        time: 129,
        content: "你还逞强说你真没错过",
      },
      {
        time: 131,
        content: "好吧你可能真的没错",
      },
      {
        time: 133,
        content: "现在每分钟我都没有你的温度",
      },
      {
        time: 136,
        content: "带走我的所有温柔",
      },
      {
        time: 140,
        content: "雪堆它融化它需要多久",
      },
      {
        time: 144,
        content: "陈奕楠：",
      },
      {
        time: 144,
        content: "这没你的冬天格外寂寞",
      },
      {
        time: 149,
        content: "与你的回忆够我留恋好久",
      },
      {
        time: 154,
        content: "也许我糊涂了",
      },
      {
        time: 157,
        content: "慌乱又无措了",
      },
      {
        time: 160,
        content: "奢望着你会停留",
      },
      {
        time: 165,
        content: "这一场雪刚好落在心头",
      },
      {
        time: 170,
        content: "这清冷季节怎么过得这么久",
      },
      {
        time: 175,
        content: "就找个借口",
      },
      {
        time: 177,
        content: "找个合适理由",
      },
      {
        time: 180,
        content: "不至于让自己",
      },
      {
        time: 183,
        content: "失了控",
      },
      {
        time: 184,
        content: "音频编辑：Sako8",
      },
      {
        time: 185,
        content: "混音：Sako8",
      },
      {
        time: 185,
        content: "母带：Sako8",
      },
      {
        time: 185,
        content: "和声：陈奕楠",
      },
      {
        time: 185,
        content: "录音：陈奕楠/ knowme/艾纳德",
      },
      {
        time: 187,
        content: "封面设计： JYT图图",
      },
      {
        time: 187,
        content: "监制： knowme/艾纳德",
      },
    ],
  }
})
</script>