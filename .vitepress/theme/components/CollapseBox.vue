<script setup lang="ts">
import { computed } from 'vue';

defineOptions({
  name: 'CollapseBox',
});

const {
  boxPlace = 'bottom',
  text = '展开',
  icon = 'i-lucide-lightbulb',
} = defineProps<{
  boxPlace?: 'top' | 'bottom';
  text?: string;
  icon?: string;
}>();

const open = defineModel({ default: false });
const iconClass = computed(() => {
  return open.value
    ? boxPlace === 'top'
      ? 'i-lucide-chevron-up'
      : 'i-lucide-chevron-down'
    : icon;
});
</script>

<template>
  <div class="flex flex-col">
    <div class="select-none relative">
      <hr class="absolute w-full" />
      <button
        class="relative mx-auto flex-center h-8 w-60% max-w-80 gap-2 rounded-full border-base transition bg-$vp-c-bg"
        hover="border-0 bg-zinc-200 dark:bg-zinc-800"
        @click="open = !open"
      >
        {{ open ? '收起' : text }}<i :class="iconClass" />
      </button>
    </div>
    <div v-show="open" :class="boxPlace === 'top' && 'order-first'">
      <slot />
    </div>
  </div>
</template>
