<script setup lang="ts">
import FatigueCards from '@/components/FatigueCards.vue'
import RiderSelector from '@/components/RiderSelector.vue'
import TitleText from '@/components/TitleText.vue'
</script>

<template>
    <TitleText>{{ $t('second_third_phase') }}</TitleText>
    <RiderSelector />
    <FatigueCards />
</template>
