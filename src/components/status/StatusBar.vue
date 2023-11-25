<script setup lang="ts">
import ArrowIcon from '@/components/status/ArrowIcon.vue'
import StatusButton from '@/components/status/StatusButton.vue'
import { Phase, useDeckStore } from '@/stores/deck'
import { storeToRefs } from 'pinia'

const store = useDeckStore()

const { state, isFirstStep, currentPhase } = storeToRefs(store)

const { toPreviousState, finishRound } = store
</script>

<template>
  <div class="flex w-11/12 items-center justify-around border-t border-brown/50 py-5 align-middle">
    <StatusButton :disabled="isFirstStep" @click="toPreviousState">
      <ArrowIcon class="rotate-180" />
      <span class="sr-only">Back</span>
    </StatusButton>

    <div class="text-3xl">{{ `${$t('current_round')}: ${state.currentRound}` }}</div>

    <StatusButton :disabled="currentPhase !== Phase.FINISH_ROUND" @click="finishRound">
      <ArrowIcon />
      <span class="sr-only">Next</span>
    </StatusButton>
  </div>
</template>
