<template>
  <div class="absolute inset-0 z-50 flex items-center justify-center rounded-[inherit] bg-black/55 backdrop-blur-sm">
    <div class="relative h-40 w-28">
      <div class="shuffle-card shuffle-card-left"></div>
      <div class="shuffle-card shuffle-card-mid"></div>
      <div class="shuffle-card shuffle-card-right"></div>
    </div>
  </div>
</template>

<style scoped>
.shuffle-card {
  position: absolute;
  inset: 0;
  border-radius: 0.5rem;
  border: 4px solid #ffffff;
  background-color: #7f1d1d;
  background-image: repeating-linear-gradient(
    45deg,
    rgba(255, 255, 255, 0.15) 0,
    rgba(255, 255, 255, 0.15) 6px,
    transparent 6px,
    transparent 12px
  );
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.4);
}

.shuffle-card-left {
  animation: shuffle-left 0.4s ease-in-out infinite;
}

.shuffle-card-mid {
  animation: shuffle-mid 0.4s ease-in-out infinite;
}

.shuffle-card-right {
  animation: shuffle-right 0.4s ease-in-out infinite;
}

@keyframes shuffle-left {
  0%,
  100% {
    transform: translateX(0) translateY(0) rotate(0);
  }
  50% {
    transform: translateX(-3.5rem) translateY(-0.75rem) rotate(-14deg);
  }
}

@keyframes shuffle-right {
  0%,
  100% {
    transform: translateX(0) translateY(0) rotate(0);
  }
  50% {
    transform: translateX(3.5rem) translateY(-0.75rem) rotate(14deg);
  }
}

@keyframes shuffle-mid {
  0%,
  100% {
    transform: translateY(0) scale(1);
  }
  50% {
    transform: translateY(0.5rem) scale(0.96);
  }
}
</style>
