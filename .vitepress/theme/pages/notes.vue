<script setup lang="ts">
import { useData } from 'vitepress';
import { computed, watch, ref, onMounted } from 'vue';
import notesJson from '@/data/__notes.json';
import NotesViewTabs from '../components/NotesViewTabs.vue';
import NotesTagPanel from '../components/NotesTagPanel.vue';
import NotesNavBlock from '../components/NotesNavBlock.vue';
import { getNotesLink, parseNotesUrlHash } from '../utils/link';
import { getSortedMarkdowns } from '../utils/sort';

defineOptions({
  name: 'Notes',
});

const viewTabs: Array<{ key: NotesView; text: string; icon: string }> = [
  { key: 'timeline', text: '时间线', icon: 'i-lucide-calendar' },
  { key: 'category', text: '文件夹', icon: 'i-lucide-folder-open' },
  { key: 'tags', text: '标签组', icon: 'i-lucide-tag' },
];
const activeViewIndex = ref(0);
const activeView = computed(() => viewTabs[activeViewIndex.value].key);

const tagNotes = getSortedMarkdowns(notesJson, 'tags');
const tags = tagNotes.map(({ label, items }) => ({
  tag: label,
  count: items.length,
}));
const activeTagIndex = ref(0);
const activeTag = computed(() => tags[activeTagIndex.value].tag);

watch([activeView, activeTag], ([view, tag]) => {
  window.open(getNotesLink(view, tag), '_self');
});

const notes = computed(() => {
  if (activeView.value === 'tags') {
    return [tagNotes[activeTagIndex.value]];
  }
  return getSortedMarkdowns(notesJson, activeView.value);
});

const { hash } = useData();
watch(hash, value => respectUrlHash(value));

onMounted(() => {
  respectUrlHash(hash.value);
});

function respectUrlHash(hash: string) {
  const { view, tag } = parseNotesUrlHash(hash);
  if (view && view !== activeView.value) {
    activeViewIndex.value = viewTabs.findIndex(v => v.key === view);
  }
  if (tag && tag !== activeTag.value) {
    activeTagIndex.value = tags.findIndex(t => t.tag === tag);
  }
}
</script>

<template>
  <main class="mx-auto max-w-3xl">
    <div class="flex flex-col gap-6 px-5 pb-20 pt-6 md:px-10">
      <NotesViewTabs v-model="activeViewIndex" :tabs="viewTabs" />
      <NotesTagPanel
        v-if="activeView === 'tags'"
        v-model="activeTagIndex"
        :tags
      />
      <NotesNavBlock :notes :view="activeView" />
    </div>
  </main>
</template>
