<script setup lang="ts">
import ChooseRider from '@/components/ChooseRider.vue'
import FinishRound from '@/components/FinishRound.vue'
import RoulerCardSelector from '@/components/RoulerCardSelector.vue'
import SprinterCardSelector from '@/components/SprinterCardSelector.vue'
import { RiderStatus, useDeckStore } from '@/stores/deck'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import RoundStatus from './components/RoundStatus.vue'

const store = useDeckStore()

const { state, showFinishedRound, showRiderSelector } = storeToRefs(store)

const currentPage = computed(() => {
    if (showRiderSelector.value) {
        return ChooseRider
    }
    if (state.value.roulerStatus === RiderStatus.DRAWN) {
        return RoulerCardSelector
    }
    if (state.value.sprinterStatus === RiderStatus.DRAWN) {
        return SprinterCardSelector
    }
    if (showFinishedRound.value) {
        return FinishRound
    }
    return null
})
</script>

<template>
    <div class="flex h-screen items-center justify-center bg-[url('/background.gif')]">
        <div
            class="flex min-h-160 max-w-2xl flex-col items-center justify-between rounded-xl border-8 border-red-900 bg-[url('/texture.jpg')] shadow-lg"
        >
            <component :is="currentPage"></component>

            <RoundStatus />
        </div>
    </div>
</template>
