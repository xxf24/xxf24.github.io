import type { DefaultTheme } from 'vitepress';
import { getSortedMarkdowns } from '../theme/utils/sort';
import postsJson from '../data/posts.json';
import notesJson from '../data/notes.json';
import { formatDate } from '@vueuse/core';

const ZodiacEmojiList = [...'🐭🐮🐯🐰🐲🐍🐴🐏🐵🐔🐶🐷'];
const CategoryToEmoji: Record<string, string> = {
  开发: '👨‍💻',
  练习: '✍️',
  问答: '🙋‍♂️',
};

export const sidebar: DefaultTheme.Sidebar = {
  '/posts': [
    ...createPostsSidebar(postsJson),
    {
      text: '🍀 音·游·书·影',
      link: '/posts/arts/',
    },
    {
      text: '🍚 干饭记',
      link: '/posts/cooks/',
    },
  ],
  '/notes': [
    {
      text: '🔍 目录',
      link: '/notes',
    },
    ...createNotesSidebar(notesJson),
  ],
};

function createNotesSidebar(notes: MarkdownMetaArr) {
  return getSortedMarkdowns(notes, 'category').map(({ label, items }) => ({
    collapsed: false,
    text: `${CategoryToEmoji[label] ?? ''} ${label}`,
    items: items.map(({ title, link }) => ({
      text: title,
      link,
    })),
  }));
}

function createPostsSidebar(posts: MarkdownMetaArr) {
  const currentYear = new Date().getFullYear();
  return getSortedMarkdowns(posts, 'timeline').map(({ label, items }) => ({
    collapsed: label !== currentYear.toString(),
    text: `${getZodiacEmoji(Number(label))} ${label}`,
    items: items.map(({ title, link, date }) => ({
      text: `<div class='flex justify-between items-center'>
          <span>${title}</span>
          <span class="text-xs">${formatDate(new Date(date), 'M/D')}</span>
        </div>`,
      link,
    })),
  }));
}

function getZodiacEmoji(year: number) {
  let index = (year - 2020) % 12;
  if (index < 0) {
    index += 12;
  }
  return ZodiacEmojiList[index];
}
