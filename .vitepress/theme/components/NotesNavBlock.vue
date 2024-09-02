<script setup lang="ts">
import { formatDate } from '@vueuse/core';
import { withBase } from 'vitepress';
import { computed, ref } from 'vue';

const props = defineProps<{
  notes: MarkdownMetaOrderArr;
  view: NotesView;
}>();

const dateFormatStr = computed(() =>
  props.view === 'timeline' ? 'M月D日' : 'YYYY/MM/DD',
);

const openList = ref<boolean[]>([]);
resetOpenList();

function resetOpenList() {
  openList.value = Array(props.notes.length).fill(true);
}

function onToggle(event: Event, index: number) {
  // @ts-ignore
  openList.value[index] = event.target.open;
}
</script>

<template>
  <div class="flex flex-col gap-5">
    <details
      v-for="(note, index) in notes"
      :key="note.label"
      :open="openList[index]"
      @toggle="onToggle($event, index)"
    >
      <summary
        class="group h-12 flex items-center justify-between rounded-lg px-2 transition"
        hover="cursor-pointer bg-gray-400/10"
      >
        <div class="text-lg font-bold" :class="view === 'timeline' && 'pl-2'">
          {{ note.label }}
        </div>
        <div
          class="flex p-2 rounded-full opacity-80 transition"
          :class="!openList[index] && '-transform-rotate-90'"
          group-hover="opacity-100 bg-black/5 dark:bg-white/10"
        >
          <i class="i-lucide-chevron-down" />
        </div>
      </summary>
      <ul>
        <li
          v-for="(item, index) in note.items"
          :key="index"
          class="group h-10 border-b border-b-solid border-$vp-c-divider"
        >
          <a
            :href="withBase(item.link)"
            class="h-full flex items-center rounded-lg transition"
            hover="bg-gray-400/10"
          >
            <div
              class="relative h-full flex items-center justify-center"
              :class="[
                view === 'timeline'
                  ? [
                      'w-12 before:(content-empty absolute translate-x-[calc(50%-1px)] -top-1/2 h-full w-full)',
                      index &&
                        'before:(border-l-2 border-l-dotted border-l-$vp-c-border)',
                    ]
                  : 'w-8',
              ]"
            >
              <i
                class="z-1 h-[5px] w-[5px] rounded-full bg-$vp-c-brand-1 transition-all duration-300 group-hover:h-4"
              />
            </div>
            <div
              class="mr-2 transition sm:mr-4 transition group-hover:text-$vp-c-brand-1"
            >
              {{ item.title }}
            </div>
            <div
              class="mr-2 gap-1"
              :class="[
                view === 'tags' ? 'flex ml-auto sm:ml-0' : 'hidden sm:flex',
                view === 'timeline' && 'ml-auto',
              ]"
            >
              <a
                v-for="tag in item.tags"
                class="flex items-center justify-center rounded bg-gray-400/20 px-2 h-5 text-xs opacity-80 transition"
                hover="opacity-100 bg-gray-400/30 text-$vp-c-brand-1"
                >{{ tag }}</a
              >
            </div>
            <div
              class="text-right text-sm"
              :class="[
                view === 'timeline' ? 'order-first w-16' : 'ml-auto mr-2',
                view === 'tags' && 'hidden sm:flex',
              ]"
            >
              {{ formatDate(new Date(item.date), dateFormatStr) }}
            </div>
          </a>
        </li>
      </ul>
    </details>
  </div>
</template>

<style scoped>
details summary::-webkit-details-marker {
  display: none;
}
</style>
