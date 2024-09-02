<script setup lang="ts">
defineProps<{
  tags: Array<{ tag: string; count: number }>;
}>();

const activeIndex = defineModel<number>({ required: true });
</script>

<template>
  <div class="relative p-1">
    <div class="flex flex-wrap gap-x-6 gap-y-2">
      <button
        v-for="(item, index) in tags"
        :key="index"
        class="relative p-2 transition underline-offset-4"
        hover="text-$vp-c-brand-1 opacity-100"
        :class="
          activeIndex === index ? 'text-$vp-c-brand-1 underline' : 'opacity-80'
        "
        @click="activeIndex = index"
      >
        {{ item.tag }}
        <span v-if="item.count" class="absolute top-1 -right-1">{{
          item.count
        }}</span>
      </button>
    </div>
  </div>
</template>
