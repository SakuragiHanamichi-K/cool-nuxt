export function useWindowSize() {
  const width = ref(window.innerWidth)
  const height = ref(window.innerHeight)

  window.addEventListener('resize', () => {
    width.value = window.innerWidth
    height.value = window.innerHeight
  })

  return { width, height }
}
