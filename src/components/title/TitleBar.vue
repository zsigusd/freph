<script setup lang="ts">
import TitleText from '@/components/title/TitleText.vue'
import { Phase, useDeckStore } from '@/stores/deck'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

const store = useDeckStore()

const { currentPhase } = storeToRefs(store)

const text = computed(() => {
  switch (currentPhase.value) {
    case Phase.CHOOSE_RIDER:
      return 'choose_rider'
    case Phase.SPRINTEUR_SELECTOR:
      return 'select_card_for_sprinter'
    case Phase.ROULEUR_SELECTOR:
      return 'select_card_for_rouler'
    case Phase.FINISH_ROUND:
      return 'second_third_phase'
    default:
      return ''
  }
})
</script>

<template>
  <TitleText>{{ $t(text) }}</TitleText>
</template>
