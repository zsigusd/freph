<script setup lang="ts">
import RiderSelector from '@/components/RiderSelector.vue'
import TitleText from '@/components/TitleText.vue'
</script>

<template>
    <TitleText>{{ $t('choose_rider') }}</TitleText>
    <RiderSelector />
</template>
