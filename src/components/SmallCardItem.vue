<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>
<template>
  <button
    :class="[
      'm-1 flex h-12 w-10 flex-col items-center justify-center rounded border border-black text-white drop-shadow-lg disabled:cursor-not-allowed disabled:opacity-60',
      $attrs.class,
    ]"
    type="button"
    v-bind="$attrs"
  >
    <div class="flex h-full w-full items-center justify-center rounded border-2 border-white">
      <slot></slot>
    </div>
  </button>
</template>
