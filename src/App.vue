<script setup lang="ts">
import FinishRound from '@components/FinishRound.vue'
import RiderSelector from '@components/RiderSelector.vue'
import RoulerCardSelector from '@components/RoulerCardSelector.vue'
import ShuffleOverlay from '@components/ShuffleOverlay.vue'
import SprinterCardSelector from '@components/SprinterCardSelector.vue'
import StatusBar from '@components/status/StatusBar.vue'
import TitleBar from '@components/title/TitleBar.vue'
import { Phase, useDeckStore } from '@stores/deck'
import { storeToRefs } from 'pinia'
import { computed, ref, watch } from 'vue'

const store = useDeckStore()

const { currentPhase, reshuffleTrigger } = storeToRefs(store)

const SHUFFLE_DURATION = 900

const isShuffling = ref(false)
let shuffleTimeout: ReturnType<typeof setTimeout> | undefined

watch(reshuffleTrigger, () => {
  isShuffling.value = true
  clearTimeout(shuffleTimeout)
  shuffleTimeout = setTimeout(() => {
    isShuffling.value = false
  }, SHUFFLE_DURATION)
})

// fallow-ignore-next-line complexity
const currentPage = computed(() => {
  switch (currentPhase.value) {
    case Phase.CHOOSE_RIDER:
      return RiderSelector
    case Phase.SPRINTEUR_SELECTOR:
      return SprinterCardSelector
    case Phase.ROULEUR_SELECTOR:
      return RoulerCardSelector
    case Phase.FINISH_ROUND:
      return FinishRound
    default:
      return RiderSelector
  }
})
</script>

<template>
  <div class="flex h-screen items-center justify-center bg-[url('/background.gif')] bg-cover">
    <div
      class="relative flex min-h-160 max-w-2xl flex-col items-center justify-between rounded-xl border-8 border-red-900 bg-[url('/texture.jpg')] shadow-lg"
    >
      <TitleBar />

      <component :is="currentPage"></component>

      <StatusBar />

      <ShuffleOverlay v-if="isShuffling" />
    </div>
  </div>
</template>
