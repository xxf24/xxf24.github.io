<script setup lang="ts">
import { defineAsyncComponent, type AsyncComponentLoader } from 'vue';

defineOptions({
  name: 'DemoLoader',
});

const props = defineProps<{
  loader: AsyncComponentLoader;
}>();

const is = defineAsyncComponent(props.loader);
</script>

<template>
  <div class="w-screen flex justify-center -ml-6 sm:ml-0 sm:w-full">
    <div
      class="m-2 max-w-full overflow-hidden rounded-lg outline-2 outline outline-gray-400/20 p-4"
    >
      <component :is />
    </div>
  </div>
</template>
