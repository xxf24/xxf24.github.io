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
    <div class="m-4 max-w-full overflow-auto">
      <ClientOnly>
        <Component :is />
      </ClientOnly>
    </div>
  </div>
</template>
