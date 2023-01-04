<script setup lang="ts">
import { RiderStatus, useDeckStore } from '@/stores/deck'
import { storeToRefs } from 'pinia'
import CardItem from './CardItem.vue'

const store = useDeckStore()

const { state } = storeToRefs(store)

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
            class="bg-amber-600 hover:bg-amber-700 hover:disabled:bg-amber-600"
            @click="drawRouler"
        >
            <div class="text-8xl">R</div>
            <div class="text-4xl">
                {{ state.selectedRouler }}
            </div>
        </CardItem>
    </div>
</template>
