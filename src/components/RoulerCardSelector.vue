<script setup lang="ts">
import CardItem from '@/components/CardItem.vue'
import { useDeckStore } from '@/stores/deck'
import { storeToRefs } from 'pinia'

const store = useDeckStore()

const { drawnRoulers } = storeToRefs(store)

const { selectRouler } = store
</script>

<template>
    <div class="my-5 text-2xl">{{ $t('select_card_for_rouler') }}</div>
    <div class="flex w-80 flex-wrap items-center justify-around align-middle">
        <CardItem
            v-for="(card, i) in drawnRoulers"
            :key="i"
            :class="card.isFatigue ? 'bg-red-600 hover:bg-red-700' : 'bg-amber-600 hover:bg-amber-700'"
            @click="selectRouler(card)"
        >
            <div class="flex h-full -translate-y-2 flex-col justify-center text-8xl">{{ card.value }}</div>
        </CardItem>
    </div>
</template>
