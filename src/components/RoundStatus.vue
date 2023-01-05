<script setup lang="ts">
import { useDeckStore } from '@/stores/deck'
import { storeToRefs } from 'pinia'

const store = useDeckStore()

const { state, showFinishedRound, isFirstStep } = storeToRefs(store)

const { toPreviousState, finishRound } = store
</script>

<template>
    <div class="flex w-11/12 items-center justify-around border-t border-brown/50 py-5 align-middle">
        <button
            :disabled="isFirstStep"
            type="button"
            class="inline-flex cursor-pointer items-center rounded-lg border bg-brown p-2.5 text-center text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-60"
            @click="toPreviousState"
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 16 16">
                <path
                    fill-rule="evenodd"
                    d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                />
            </svg>
            <span class="sr-only">Back</span>
        </button>

        <div class="text-3xl">{{ `${$t('current_round')}: ${state.currentRound}` }}</div>

        <button
            :disabled="!showFinishedRound"
            type="button"
            class="inline-flex cursor-pointer items-center rounded-lg bg-brown p-2.5 text-center text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-60"
            @click="finishRound"
        >
            <svg
                aria-hidden="true"
                class="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    fill-rule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                ></path>
            </svg>
            <span class="sr-only">Next</span>
        </button>
    </div>
</template>
