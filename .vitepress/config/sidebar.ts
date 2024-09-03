import type { DefaultTheme } from 'vitepress';
import { getSortedMarkdowns } from '../theme/utils/sort';
import postsJson from '../data/posts.json';
import notesJson from '../data/notes.json';

const CategoryToEmoji: Record<string, string> = {
  开发: '👨‍💻',
  练习: '🗒️',
  问答: '🙋‍♂️',
  上网: '🗺️',
};

export const sidebar: DefaultTheme.Sidebar = {
  '/posts': [],
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
