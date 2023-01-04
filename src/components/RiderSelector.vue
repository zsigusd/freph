<script setup lang="ts">
import { RiderStatus, useDeckStore } from '@/stores/deck'
import { storeToRefs } from 'pinia'
import CardItem from './CardItem.vue'

const store = useDeckStore()

const { state } = storeToRefs(store)

const { drawRouler, drawSprinter } = store
</script>

<template>
    <div class="flex">
        <CardItem :disabled="state.sprinterStatus === RiderStatus.FINISHED" @click="drawSprinter">
            <div class="text-8xl">S</div>
            <div class="text-3xl">
                {{ state.selectedSprinter }}
            </div>
        </CardItem>
        <CardItem :disabled="state.roulerStatus === RiderStatus.FINISHED" @click="drawRouler">
            <div class="text-8xl">R</div>
            <div class="text-3xl">
                {{ state.selectedRouler }}
            </div>
        </CardItem>
    </div>
</template>
