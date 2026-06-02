<script setup lang="ts">
import CardItem from '@components/CardItem.vue'
import ShuffleOverlay from '@components/ShuffleOverlay.vue'
import { useShuffleOverlay } from '@composables/useShuffleOverlay'
import { useDeckStore } from '@stores/deck'
import { storeToRefs } from 'pinia'

const store = useDeckStore()

const { drawnSprinters, sprinterReshuffledOnLastDraw } = storeToRefs(store)

const { selectSprinter } = store

const { isShuffling } = useShuffleOverlay(sprinterReshuffledOnLastDraw)
</script>

<template>
  <div class="relative flex w-80 flex-wrap items-center justify-around align-middle">
    <CardItem
      v-for="(card, i) in drawnSprinters"
      :key="i"
      :class="card.isFatigue ? 'bg-red-600 hover:bg-red-700' : 'bg-violet-700 hover:bg-violet-800'"
      @click="selectSprinter(card)"
    >
      <div class="flex h-full -translate-y-2 flex-col justify-center text-8xl">
        {{ card.value }}
      </div>
    </CardItem>

    <ShuffleOverlay v-if="isShuffling" />
  </div>
</template>
