<script setup lang="ts">
import {
  watch,
  ref,
  onMounted,
  useTemplateRef,
  computed,
  watchEffect,
} from 'vue';
import { use2048 } from './use2048';
import { locales } from './config.json';
import Tile from './tile.vue';
import { useMediaQuery } from '@vueuse/core';

const refBoard = useTemplateRef('gameBoard');
const refScore = useTemplateRef('scorePanel');

const { gg, score, best, tiles, ...model } = use2048(refBoard);

const n = ref(4);
const side = ref(4.5);
const gap = ref(0.5);
const cssVars = computed(() => ({
  '--n': n.value,
  '--side': `${side.value}rem`,
  '--gap': `${gap.value}rem`,
}));

onMounted(() => {
  model.load();
  const isMobile = useMediaQuery('(max-width: 640px)');
  const isTablet = useMediaQuery('(max-width: 960px)');
  watchEffect(() => {
    if (isMobile.value) {
      side.value = 4.5;
      gap.value = 0.5;
    } else if (isTablet.value) {
      side.value = 4.75;
      gap.value = 0.75;
    } else {
      side.value = 5.25;
      gap.value = 0.75;
    }
  });
});

watch(score, (value, oldValue) => {
  if (oldValue) {
    playScoreGrowthAnimation(value - oldValue);
  }
});

function playScoreGrowthAnimation(value: number) {
  // todo...
}

function newGame() {
  model.init({ size: n.value });
}
</script>

<template>
  <div
    class="select-none text-[#776e65] dark:text-zinc-200"
    @touchmove.stop.prevent
  >
    <div class="flex flex-col gap-2">
      <div class="flex items-center justify-between gap-2">
        <div class="w-32 p-2 rounded text-center text-5xl font-bold">2048</div>
        <div class="flex items-center gap-2">
          <div ref="scorePanel" class="w-20 text-center p-1 rounded cell">
            <div class="text-sm mb-[2px] text-[#eee4da] dark:text-zinc-200">
              {{ locales.score }}
            </div>
            <div class="text-lg font-bold text-white">{{ score }}</div>
          </div>
          <div class="w-20 text-center p-1 rounded cell">
            <div class="text-sm mb-[2px] text-[#eee4da] dark:text-zinc-200">
              {{ locales.best }}
            </div>
            <div class="text-lg font-bold text-white">{{ best }}</div>
          </div>
        </div>
      </div>
      <div class="flex items-center justify-between gap-2">
        <div class="flex items-center">
          <span class="text-sm">{{ locales.caption }}</span>
          <span class="ml-1 text-base">2048</span>
        </div>
        <div class="flex items-center">
          <div
            v-show="model.canIBack()"
            class="mr-6 flex items-center justify-center w-12 h-12 rounded-full transition"
            hover="cursor-pointer bg-black/5 dark:bg-white/10"
            :title="locales.revert"
            @click="model.back()"
          >
            <i class="i-lucide-reply" />
          </div>
          <div
            class="w-20 p-3 rounded text-center text-white bg-[#8f7a66]"
            hover="cursor-pointer"
            @click="newGame"
          >
            {{ locales.new }}
          </div>
        </div>
      </div>
    </div>
    <div ref="gameBoard" class="mt-3 relative bg-[#bbada0] rounded-lg">
      <div class="relative p-$gap" :style="cssVars">
        <div
          class="grid gap-$gap grid-cols-[repeat(var(--n),1fr)] grid-rows-[repeat(var(--n),1fr)]"
        >
          <div
            v-for="_ in n * n"
            :key="_"
            class="rounded w-$side h-$side bg-[#cdc1b4]"
          />
        </div>
        <div class="absolute inset-$gap">
          <div
            v-for="tile in tiles"
            :key="tile.id"
            class="absolute w-$side h-$side transition duration-200 translate-x-$tx translate-y-$ty text-[calc(var(--side)*0.4)]"
            :style="{
              '--tx': `calc(var(--side) * ${tile.x} + var(--gap) * ${tile.x})`,
              '--ty': `calc(var(--side) * ${tile.y} + var(--gap) * ${tile.y})`,
            }"
          >
            <Tile :score="tile.score">
              {{ tile.score }}
            </Tile>
          </div>
        </div>
      </div>
      <Transition name="gg">
        <div
          v-if="gg"
          class="absolute inset-0 flex flex-col items-center justify-center bg-white/40 dark:bg-black/60"
        >
          <div class="mb-4 text-4xl font-bold">Game Over</div>
          <div
            class="w-20 rounded text-xl text-center p-2 text-white bg-[#8f7a66]"
            hover="cursor-pointer"
            @click="newGame"
          >
            {{ locales.again }}
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<style scoped>
.gg-enter-from {
  opacity: 0;
  transform: scale(0.7);
}

.gg-enter-active {
  transition:
    opacity 0.5s ease-in-out,
    transform 0.5s ease-in-out;
  transition-delay: 1s;
}

.cell {
  background: #bbada0;
  color: #fff;
}

.dark .cell {
  background: #574a3e;
}
</style>
