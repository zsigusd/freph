<script setup lang="ts">
import { useDeckStore } from '@/stores/deck'
import { storeToRefs } from 'pinia'

const store = useDeckStore()

const { state } = storeToRefs(store)

const { addRoulerFatigueCard, addSprinterFatigueCard } = store
</script>

<template>
    <div class="my-5 flex">
        <button
            :disabled="state.sprinterFatigueAdded"
            class="mx-5 h-20 w-28 rounded bg-red-500 text-white hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-60"
            @click="addSprinterFatigueCard"
        >
            {{ $t('add_sprinter_fatigue') }}
        </button>
        <button
            :disabled="state.roulerFatigueAdded"
            class="mx-5 h-20 w-28 rounded bg-red-500 text-white hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-60"
            @click="addRoulerFatigueCard"
        >
            {{ $t('add_rouler_fatigue') }}
        </button>
    </div>
</template>
