<template>
  <button
    class="m-5 flex h-40 w-28 flex-col items-center justify-center rounded-lg border border-black text-white drop-shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
    type="button"
  >
    <div class="h-full w-full rounded-lg border-4 border-white">
      <slot></slot>
    </div>
  </button>
</template>
