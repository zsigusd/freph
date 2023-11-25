<script setup lang="ts">
import HistoryIcon from '@/components/HistoryIcon.vue';
import SmallCardItem from '@/components/SmallCardItem.vue';
import TitleText from '@/components/title/TitleText.vue';
import type { Card } from '@/stores/deck';
import { ref } from 'vue';

defineProps<{
  cards: Card[]
  cardColor: string
}>()

const dialog = ref<HTMLDialogElement>();
</script>
<template>
  <button
    class="cursor-pointer items-center rounded-lg bg-stone-600 p-2.5 text-center text-sm font-medium text-white hover:bg-stone-700 disabled:cursor-not-allowed disabled:opacity-60 hover:disabled:bg-stone-600"
    :disabled="cards.length === 0" :title="$t('dismissed_cards')" @click="dialog?.showModal()">
    <HistoryIcon />
  </button>
  <dialog ref="dialog" class="modal">
    <div class="modal-box relative w-fit max-w-18 border-4 border-red-900 bg-[url('/texture.jpg')] p-4">
      <TitleText class="w-full pt-0">{{ $t('dismissed_cards') }}</TitleText>
      <div class="flex flex-wrap justify-center pt-4">
        <SmallCardItem v-for="(card, i) in cards" :key="i" :class="cardColor" :disabled="true">
          <div class="text-xl">
            {{ card.value }}
          </div>
        </SmallCardItem>
      </div>
    </div>
    <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>
</template>
