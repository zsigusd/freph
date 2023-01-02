<script setup lang="ts">
import { RiderStatus, useDeckStore } from './stores/deck'
import { storeToRefs } from 'pinia'

const store = useDeckStore()

const { drawnRoulers, drawnSprinters, isStateSaved, state, showFinishedRound, showRiderSelector } = storeToRefs(store)

const {
    drawRouler,
    drawSprinter,
    selectRouler,
    selectSprinter,
    addRoulerFatigueCard,
    addSprinterFatigueCard,
    finishRound,
    restoreState,
} = store
</script>

<template>
    <div class="flex flex-col items-center justify-center">
        <div v-if="showRiderSelector" class="flex flex-col items-center">
            <div v-if="!showFinishedRound" class="my-5 text-2xl">{{ $t('choose_rider') }}</div>
            <div v-if="showFinishedRound" class="my-5 text-2xl">{{ $t('second_third_phase') }}</div>
            <div class="flex">
                <button
                    :disabled="state.roulerStatus === RiderStatus.FINISHED"
                    class="mx-5 my-5 flex h-40 w-28 flex-col items-center justify-center bg-sky-700 px-4 py-2 text-white hover:bg-sky-800 disabled:cursor-not-allowed disabled:opacity-50 sm:px-8 sm:py-3"
                    @click="drawRouler"
                >
                    <div class="text-8xl">R</div>
                    <div class="text-3xl">
                        {{ state.selectedRouler }}
                    </div>
                </button>
                <button
                    :disabled="state.sprinterStatus === RiderStatus.FINISHED"
                    class="mx-5 my-5 h-40 w-28 bg-sky-700 px-4 py-2 text-white hover:bg-sky-800 disabled:cursor-not-allowed disabled:opacity-50 sm:px-8 sm:py-3"
                    @click="drawSprinter"
                >
                    <div class="text-8xl">S</div>
                    <div class="text-3xl">
                        {{ state.selectedSprinter }}
                    </div>
                </button>
            </div>
        </div>

        <div v-if="state.roulerStatus === RiderStatus.IN_USE" class="flex flex-col items-center">
            <div class="my-5 text-2xl">{{ $t('select_card_for_rouler') }}</div>
            <div class="flex flex-wrap justify-center">
                <button
                    v-for="(card, i) in drawnRoulers"
                    :key="i"
                    class="mx-5 my-5 flex h-40 w-28 flex-col items-center justify-center bg-sky-700 px-4 py-2 text-8xl text-white hover:bg-sky-800 sm:px-8 sm:py-3"
                    @click="selectRouler(card)"
                >
                    {{ card.value }}
                </button>
            </div>
        </div>

        <div v-if="state.sprinterStatus === RiderStatus.IN_USE" class="flex flex-col items-center">
            <div class="my-5 text-2xl">{{ $t('select_card_for_sprinter') }}</div>
            <div class="flex flex-wrap justify-center">
                <button
                    v-for="(card, i) in drawnSprinters"
                    :key="i"
                    class="mx-5 my-5 flex h-40 w-28 flex-col items-center justify-center bg-sky-700 px-4 py-2 text-8xl text-white hover:bg-sky-800 sm:px-8 sm:py-3"
                    @click="selectSprinter(card)"
                >
                    {{ card.value }}
                </button>
            </div>
        </div>

        <div v-if="showFinishedRound" class="flex flex-col items-center justify-center">
            <div class="my-5 flex">
                <button
                    :disabled="state.roulerFatigueAdded"
                    class="mx-5 h-20 w-28 bg-red-500 text-white hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                    @click="addRoulerFatigueCard"
                >
                    {{ $t('add_rouler_fatigue') }}
                </button>
                <button
                    :disabled="state.sprinterFatigueAdded"
                    class="mx-5 h-20 w-28 bg-red-500 text-white hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                    @click="addSprinterFatigueCard"
                >
                    {{ $t('add_sprinter_fatigue') }}
                </button>
            </div>
            <button
                class="my-5 h-16 w-64 bg-emerald-500 px-4 py-2 text-white hover:bg-emerald-600 sm:px-8 sm:py-3"
                @click="finishRound"
            >
                {{ $t('finish_round') }}
            </button>
        </div>

        <button
            :disabled="!isStateSaved"
            class="mt-5 h-16 w-64 bg-sky-700 px-4 py-2 text-white hover:bg-sky-800 disabled:cursor-not-allowed disabled:opacity-50 sm:px-8 sm:py-3"
            @click="restoreState"
        >
            {{ $t('back') }}
        </button>

        <div class="mt-5">{{ `${$t('current_round')}: ${state.currentRound}` }}</div>
    </div>
</template>

<style scoped>
/*:empty*/
</style>
