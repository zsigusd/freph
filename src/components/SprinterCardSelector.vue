<script setup lang="ts">
import CardItem from '@/components/CardItem.vue'
import { useDeckStore } from '@/stores/deck'
import { storeToRefs } from 'pinia'

const store = useDeckStore()

const { drawnSprinters } = storeToRefs(store)

const { selectSprinter } = store
</script>

<template>
    <div class="my-5 text-2xl">{{ $t('select_card_for_sprinter') }}</div>
    <div class="flex w-80 flex-wrap items-center justify-around align-middle">
        <CardItem
            v-for="(card, i) in drawnSprinters"
            :key="i"
            class="bg-violet-700 hover:bg-violet-800"
            @click="selectSprinter(card)"
        >
            <div class="flex h-full -translate-y-2 flex-col justify-center text-8xl">
                {{ card.value }}
            </div>
        </CardItem>
    </div>
</template>
