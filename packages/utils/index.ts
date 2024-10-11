export * from "./install"

export function shuffleArray<T>(array: T[]): T[] {
  // Fisher-Yates 算法
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]] // 交换元素
  }
  return array
}
