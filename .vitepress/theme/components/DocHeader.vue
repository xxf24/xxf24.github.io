<script setup lang="ts">
import { computed } from 'vue';
import { useData } from 'vitepress';
import { formatDate, formatTimeAgo } from '@vueuse/core';
import { getNotesLinkByTag } from '../utils/link';

const { frontmatter: fm } = useData();

const props = computed(() => {
  if (fm.value.hidden) {
    return;
  }
  let ctime = '';
  let mtime = '';
  const { center, title, date, tags, lastUpdateTime } = fm.value;
  if (date) {
    const d = new Date(date);
    ctime = center
      ? formatDate(d, 'YYYY年M月D日', { locales: 'zh-CN' })
      : formatDate(d, 'MMM D, YYYY', { locales: 'en' });
  }
  if (lastUpdateTime) {
    mtime = formatTimeAgo(new Date(lastUpdateTime));
  }
  return {
    center,
    title,
    ctime,
    mtime,
    tags,
  };
});
</script>

<template>
  <header class="relative">
    <div
      v-if="props?.title"
      class="mb-8 flex flex-col"
      :class="props.center && 'items-center'"
    >
      <h1 class="mb-4 text-3xl font-bold">{{ props.title }}</h1>
      <ul class="flex flex-wrap gap-x-7 gap-y-2 text-sm text-$vp-c-text-2">
        <li
          v-if="props.ctime"
          class="flex items-center gap-1"
          title="本文创建日期"
        >
          <i class="i-lucide-calendar" />{{ props.ctime }}
        </li>
        <li
          v-if="props.mtime"
          class="flex items-center gap-1"
          title="距离上次修改"
        >
          <i class="i-lucide-file-pen" />{{ props.mtime }}
        </li>
        <li v-if="props.tags" class="flex items-center">
          <template v-for="(tag, index) in props.tags" :key="index">
            <a
              :href="getNotesLinkByTag(tag)"
              class="peer transition hover:text-$vp-c-brand-1"
              >{{ tag }}</a
            >
            <span v-if="index < props.tags.length - 1" class="ml-0.5 mr-1.5"
              >,</span
            >
          </template>
          <i
            class="order-first mr-1 transition peer-hover:text-$vp-c-brand-1"
            :class="props.tags.length > 1 ? 'i-lucide-tags' : 'i-lucide-tag'"
          />
        </li>
      </ul>
    </div>
  </header>
</template>
