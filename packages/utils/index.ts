export * from "./install"

export function shuffleArray<T>(array: T[]): T[] {
  // Fisher-Yates 算法
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]] // 交换元素
  }
  return array
}

export async function getAudioDuration(url: string) {
  const audioContext = new AudioContext()
  if (audioContext.state === "suspended") {
    const audioBuffer = await fetch(url)
      .then((response) => response.arrayBuffer())
      .then((arrayBuffer) => audioContext.decodeAudioData(arrayBuffer))
    return audioBuffer.duration
  }
  await audioContext.resume()
  const audioBuffer = await fetch(url)
    .then((response) => response.arrayBuffer())
    .then((arrayBuffer) => audioContext.decodeAudioData(arrayBuffer))
  return audioBuffer.duration
}
