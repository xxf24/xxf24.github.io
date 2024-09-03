<script setup lang="ts">
import { useData } from 'vitepress';

const { isDark } = useData();

function onClick() {
  isDark.value = !isDark.value;
}
</script>

<template>
  <button
    class="flex-center p-3 rounded-full text-base transition"
    hover="bg-black/5 dark:bg-white/10"
    @click="onClick"
  >
    <i class="i-line-md-sun-rising-loop dark:i-line-md-moon-rising-loop" />
  </button>
</template>
