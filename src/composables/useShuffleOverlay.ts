import { onMounted, onUnmounted, type Ref, ref } from 'vue'

// Keep in sync with the ShuffleOverlay animation (0.4s cycle, ~2 cycles).
const SHUFFLE_DURATION = 800

// The reshuffle happens inside draw(), before the selector mounts, so we read a
// flag on mount rather than watching a reactive trigger that would arrive too late.
export function useShuffleOverlay(reshuffledOnLastDraw: Ref<boolean>) {
  const isShuffling = ref(false)
  let shuffleTimeout: ReturnType<typeof setTimeout> | undefined

  onMounted(() => {
    if (!reshuffledOnLastDraw.value) {
      return
    }
    isShuffling.value = true
    shuffleTimeout = setTimeout(() => {
      isShuffling.value = false
    }, SHUFFLE_DURATION)
  })

  onUnmounted(() => {
    clearTimeout(shuffleTimeout)
  })

  return { isShuffling }
}
