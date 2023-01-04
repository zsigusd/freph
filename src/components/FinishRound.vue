<script setup lang="ts">
import FatigueCards from '@/components/FatigueCards.vue'
import RiderSelector from '@/components/RiderSelector.vue'
</script>

<template>
    <div class="my-5 text-2xl">{{ $t('second_third_phase') }}</div>
    <RiderSelector />
    <FatigueCards />
</template>
