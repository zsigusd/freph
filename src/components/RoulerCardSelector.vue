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
    <div class="flex flex-wrap justify-center">
        <CardItem v-for="(card, i) in drawnRoulers" :key="i" @click="selectRouler(card)">
            <div class="text-8xl">{{ card.value }}</div>
        </CardItem>
    </div>
</template>
