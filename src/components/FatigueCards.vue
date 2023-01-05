<script setup lang="ts">
import CardItem from '@/components/CardItem.vue'
import { useDeckStore } from '@/stores/deck'
import { storeToRefs } from 'pinia'

const store = useDeckStore()

const { state } = storeToRefs(store)

const { addRoulerFatigueCard, addSprinterFatigueCard } = store
</script>

<template>
    <div class="flex w-80 items-center justify-around align-middle">
        <CardItem
            :disabled="state.sprinterFatigueAdded"
            class="bg-red-600 hover:bg-red-700 hover:disabled:bg-red-600"
            :title="$t('add_sprinter_fatigue')"
            @click="addSprinterFatigueCard"
        >
            <div class="flex flex-col">
                <div class="text-4xl">+</div>
                <div class="text-6xl">S</div>
                <div class="text-4xl">2</div>
            </div>
        </CardItem>

        <CardItem
            :disabled="state.roulerFatigueAdded"
            class="bg-red-600 hover:bg-red-700 hover:disabled:bg-red-600"
            :title="$t('add_rouler_fatigue')"
            @click="addRoulerFatigueCard"
        >
            <div class="flex flex-col">
                <div class="text-4xl">+</div>
                <div class="text-6xl">R</div>
                <div class="text-4xl">2</div>
            </div>
        </CardItem>
    </div>
</template>
