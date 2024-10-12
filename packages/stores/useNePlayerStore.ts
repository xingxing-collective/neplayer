import { PlayModeType, type Playlist, type Song } from "@neplayer/components"
import { getAudioDuration, shuffleArray } from "@neplayer/utils"
import { useToggle } from "@vueuse/core"
import { defineStore } from "pinia"
import { ref, watch } from "vue"

export const useNePlayerStore = defineStore("player", () => {
  const audio = ref<HTMLAudioElement>()
  /**
   * Gets or sets the volume level for audio portions of the media element.
   * @default ```0.4```
   */
  const volume = ref<number>(0.4)
  /**
   * Gets or sets the current playback position, in seconds.
   */
  const currentTime = ref<number>()

  const currentSong = ref<Song>()

  const playlist = ref<Playlist>([])
  const shufflePlaylist = ref<Playlist>([])
  const isOpen = ref<boolean>(false)

  const [playerModeState, playerModeStateToggle] = useToggle(false)
  const [playState, playStateToggle] = useToggle(false)

  /**
   * play mode repeat or shuffle or single
   */
  const playmode = ref<PlayModeType>(PlayModeType.REPEAT)

  /**
   * add songs to playlist
   * @param list songs
   */
  async function addSongs(...list: Playlist) {
    for await (const s of list) {
      if (!playlist.value.includes(s)) {
        const duration = await getAudioDuration(s.url)
        playlist.value.push({ ...s, duration })
      }
    }
    if (!currentSong.value) {
      currentSong.value = playlist.value[0]
    }
  }

  function deleteSong(name: string) {
    const index = playlist.value.findIndex((x) => x.name === name)
    playlist.value.slice(index, 1)
  }

  function clearPlaylist() {
    playlist.value = []
    shufflePlaylist.value = []
  }

  function getNextSong(control: "next" | "prev") {
    let nextIndex = 0
    const currentPlaylist =
      playmode.value === PlayModeType.SHUFFLE
        ? [...shufflePlaylist.value]
        : [...playlist.value]

    if (currentPlaylist.length === 0) return
    if (!currentSong.value) currentSong.value = currentPlaylist[0]
    const index = currentPlaylist.indexOf(currentSong.value)
    if (control === "next") {
      nextIndex =
        index !== -1 && index === currentPlaylist.length - 1 ? 0 : index + 1
    } else {
      nextIndex =
        index !== -1 && index === 0 ? currentPlaylist.length - 1 : index - 1
    }
    return currentPlaylist[nextIndex]
  }

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

  watch(
    playmode,
    () => {
      if (playmode.value === PlayModeType.SHUFFLE) {
        shufflePlaylist.value = shuffleArray([...playlist.value])
      }
    },
    {
      immediate: true,
    }
  )

  return {
    audio,
    currentTime,
    currentSong,
    playlist,
    shufflePlaylist,
    isOpen,
    volume,
    playmode,
    playState,
    playStateToggle,
    playerModeState,
    playerModeStateToggle,
    addSongs,
    deleteSong,
    clearPlaylist,
    getNextSong,
  }
})
