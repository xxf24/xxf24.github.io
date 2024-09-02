<script setup lang="ts">
import { formatTimeAgo, useIntersectionObserver } from '@vueuse/core';
import { ref } from 'vue';
import { ofetch } from 'ofetch';
import LanguageColor from '@/data/language-color.json';

defineOptions({
  name: 'GitRepoCard',
});

const { endPoint, timeout = 6e3 } = defineProps<{
  endPoint: string;
  timeout?: number;
}>();

const data = ref();
const state = ref<'loading' | 'ok' | 'error'>('loading');

const target = ref();
const { stop } = useIntersectionObserver(target, ([{ isIntersecting }]) => {
  if (isIntersecting) {
    fetchData();
    stop();
  }
});

function fetchData() {
  const api = `https://api.github.com/repos/${endPoint}`;
  ofetch(api, {
    timeout,
    headers: {
      Accept: 'application/vnd.github.v4+json',
    },
  })
    .then(res => {
      data.value = wrapperResponse(res);
      state.value = 'ok';
    })
    .catch(() => fetchLocalData());
}

function fetchLocalData() {
  const api = new URL('../../data/repos.json', import.meta.url).href;
  ofetch(api)
    .then(res => {
      data.value = wrapperResponse(res[endPoint]);
      state.value = 'ok';
    })
    .catch(error => {
      console.error(error);
      state.value = 'error';
    });
}
function wrapperResponse(res: any) {
  return {
    stamp: res.stamp,
    avatar_url: res?.avatar_url ?? res.owner?.avatar_url,
    name: res.full_name,
    html_url: res.html_url,
    description: res.description,
    language: res.language ?? 'Other',
    stargazers_count: formatNumber(res.stargazers_count),
    forks_count: formatNumber(res.forks_count),
    pushed_at: formatTimeAgo(new Date(res.pushed_at)),
  };
}

function formatNumber(value: number) {
  return value > 999 ? `${(value / 1000).toFixed(1)}k` : value.toString();
}
</script>

<template>
  <div ref="target" class="overflow-hidden min-h-29 rounded-lg border-base">
    <div
      v-if="state === 'loading'"
      class="h-full animate-pulse bg-black/5 dark:bg-white/10"
    />
    <div v-else-if="state === 'ok'" class="p-4">
      <div class="mb-2 flex items-center gap-2">
        <img :src="data.avatar_url" alt="" class="h-5.5 w-5.5" />
        <a :href="data.html_url" target="_blank" rel="noopener noreferrer">
          {{ endPoint }}
        </a>
      </div>
      <div class="mb-4 break-words text-sm">{{ data.description }}</div>
      <div class="flex flex-wrap gap-x-8 gap-y-2 text-xs text-$vp-c-text-2">
        <div class="flex items-center gap-1">
          <!-- @vue-ignore -->
          <i
            class="h-3 w-3 border border-gray-500/40 rounded-full"
            :style="{
              background: LanguageColor[data.language],
            }"
          />{{ data.language }}
        </div>
        <div class="flex items-center gap-1">
          <i class="i-lucide-star" />{{ data.stargazers_count }}
        </div>
        <div class="flex items-center gap-1">
          <i class="i-lucide-git-fork" />{{ data.forks_count }}
        </div>
        <div
          v-if="!data.stamp"
          class="flex items-center gap-1"
          title="The latest PR created on"
        >
          <i class="i-lucide-git-pull-request-create" />{{ data.pushed_at }}
        </div>
        <div
          v-else
          class="flex items-center gap-1"
          title="Using the last saved data"
        >
          <i class="i-lucide-save" />{{ formatTimeAgo(new Date(data.stamp)) }}
        </div>
      </div>
    </div>
    <div v-else-if="state === 'error'"></div>
  </div>
</template>
