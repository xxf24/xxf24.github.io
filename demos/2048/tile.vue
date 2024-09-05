<script setup lang="ts">
import { computed, ref, watch } from 'vue';

const { score } = defineProps<{
  score: number;
}>();

const aniClass = ref<'tile-merge' | 'tile-popup' | undefined>();
const colorClass = computed(() => `tile-${score < 2048 ? score : 'super'}`);

watch(
  () => score,
  (_, oldScore) => {
    aniClass.value = oldScore ? 'tile-merge' : 'tile-popup';
  },
  { immediate: true },
);
</script>

<template>
  <div
    class="w-full h-full flex items-center justify-center rounded font-bold"
    :class="[colorClass, aniClass]"
    @animationend="aniClass = undefined"
  >
    <slot />
  </div>
</template>

<style scoped>
.tile-popup {
  animation: popup 0.2s;
}

.tile-merge {
  animation: merge 0.2s;
  animation-delay: 0.2s;
}

@keyframes popup {
  0% {
    opacity: 0.4;
    transform: scale(0.3);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes merge {
  0%,
  100% {
    transform: scale(1);
  }
  40% {
    transform: scale(1.2);
  }
}

.tile-2 {
  color: #645b52;
  background: #f7f4ef;
}

.tile-4 {
  color: #645b52;
  background: #ede0c8;
}

.tile-8 {
  color: #ffffff;
  background: #f2b179;
}

.tile-16 {
  color: #ffffff;
  background: #f59563;
}

.tile-32 {
  color: #ffffff;
  background: #f67c5f;
}

.tile-64 {
  color: #ffffff;
  background: #f65e3b;
}

.tile-128 {
  color: #ffffff;
  background: #edcf72;
  box-shadow: 0 0 20px 0 rgba(243, 215, 116, 0.3);
}

.tile-256 {
  color: #ffffff;
  background: #edcc61;
  box-shadow: 0 0 20px 0 rgba(243, 215, 116, 0.4);
}

.tile-512 {
  color: #ffffff;
  background: #edc850;
  box-shadow: 0 0 20px 0 rgba(243, 215, 116, 0.5);
}

.tile-1024 {
  color: #ffffff;
  background: #edc53f;
  box-shadow: 0 0 20px 0 rgba(243, 215, 116, 0.6);
}

.tile-2048 {
  color: #ffffff;
  background: #edc22e;
  box-shadow: 0 0 20px 0 rgba(243, 215, 116, 0.7);
}

.tile-super {
  color: #ffffff;
  background: #1c1c1c;
  box-shadow: 0 0 20px 0 rgba(28, 28, 28, 0.4);
}
</style>
