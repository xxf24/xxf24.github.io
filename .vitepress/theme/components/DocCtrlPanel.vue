<script setup lang="ts">
import { useWindowScroll } from '@vueuse/core';

const { y: scrollY } = useWindowScroll();

function toTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}
</script>

<template>
  <button
    class="fixed hidden z-10 right-6 bottom-6 p-3 rounded-full transition text-base sm:flex"
    hover="opacity-100 bg-black/5 dark:bg-white/10"
    :class="scrollY > 600 ? 'opacity-60' : 'opacity-0! pointer-events-none'"
    title="回到顶部"
    @click="toTop()"
  >
    <i class="i-lucide-arrow-up" />
  </button>
</template>
