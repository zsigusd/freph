<template>
    <button
        class="mx-5 my-5 flex h-40 w-28 flex-col items-center justify-center rounded border border-black text-white disabled:cursor-not-allowed disabled:opacity-60"
        type="button"
    >
        <div class="h-full w-full rounded border-4 border-white">
            <slot></slot>
        </div>
    </button>
</template>
