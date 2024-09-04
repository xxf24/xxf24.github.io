<script setup lang="ts">
const on = {
  beforeEnter(el: HTMLElement) {},

  enter(el: HTMLElement) {},

  afterEnter(el: HTMLElement) {},

  beforeLeave(el: HTMLElement) {},

  leave(el: HTMLElement) {},

  afterLeave(el: HTMLElement) {},
};
</script>

<template>
  <Transition :on>
    <slot />
  </Transition>
</template>
