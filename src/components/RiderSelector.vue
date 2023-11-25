<script setup lang="ts">
import CardItem from '@/components/CardItem.vue'
import { RiderStatus, useDeckStore } from '@/stores/deck'
import { storeToRefs } from 'pinia'
import HistoryButton from './HistoryButton.vue'

const store = useDeckStore()

const { state, sortedUsedRoulers, sortedUsedSprinters } = storeToRefs(store)

const { drawRouler, drawSprinter } = store
</script>

<template>
  <div class="flex w-80 items-center justify-around align-middle">
    <CardItem
      :disabled="state.sprinterStatus === RiderStatus.FINISHED"
      class="bg-violet-700 hover:bg-violet-800 hover:disabled:bg-violet-700"
      @click="drawSprinter"
    >
      <div class="text-8xl">S</div>
      <div class="text-4xl">
        {{ state.selectedSprinter }}
      </div>
    </CardItem>
    <CardItem
      :disabled="state.roulerStatus === RiderStatus.FINISHED"
      class="indicator bg-amber-600 hover:bg-amber-700 hover:disabled:bg-amber-600"
      @click="drawRouler"
    >
      <div class="text-8xl">R</div>
      <div class="text-4xl">
        {{ state.selectedRouler }}
      </div>
    </CardItem>
  </div>
  <div class="flex w-80 items-center justify-around align-middle">
    <HistoryButton :cards="sortedUsedSprinters" card-color="bg-violet-700"></HistoryButton>
    <HistoryButton :cards="sortedUsedRoulers" card-color="bg-amber-600"></HistoryButton>
  </div>
</template>
