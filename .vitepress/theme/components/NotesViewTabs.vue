<script setup lang="ts">
defineProps<{
  tabs: Array<{ key: NotesView; text: string; icon: string }>;
}>();

const activeIndex = defineModel<number>({ required: true });
</script>

<template>
  <nav class="relative">
    <ul class="inline-flex rounded-lg p-1 bg-zinc-100 dark:bg-zinc-800">
      <li
        v-for="(item, index) in tabs"
        class="relative z-1 w-24 h-8 rounded-md bg-transparent"
      >
        <button
          class="h-full w-full flex items-center justify-center gap-2 transition"
          hover="opacity-100"
          :class="activeIndex === index ? 'opacity-100' : 'opacity-70'"
          @click="activeIndex = index"
        >
          <i :class="item.icon" />{{ item.text }}
        </button>
      </li>
    </ul>
    <div
      class="absolute inset-1 w-24 rounded-md bg-$vp-c-bg transition duration-300 ease-in-out"
      :style="{
        transform: `translateX(${activeIndex * 100}%)`,
      }"
    />
  </nav>
</template>
