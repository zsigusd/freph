<script setup lang="ts">
import FinishRound from '@/components/FinishRound.vue'
import RiderSelector from '@/components/RiderSelector.vue'
import RoulerCardSelector from '@/components/RoulerCardSelector.vue'
import SprinterCardSelector from '@/components/SprinterCardSelector.vue'
import StatusBar from '@/components/status/StatusBar.vue'
import TitleBar from '@/components/title/TitleBar.vue'
import { Phase, useDeckStore } from '@/stores/deck'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

const store = useDeckStore()

const { currentPhase } = storeToRefs(store)

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
      class="flex min-h-160 max-w-2xl flex-col items-center justify-between rounded-xl border-8 border-red-900 bg-[url('/texture.jpg')] shadow-lg"
    >
      <TitleBar />

      <component :is="currentPage"></component>

      <StatusBar />
    </div>
  </div>
</template>
