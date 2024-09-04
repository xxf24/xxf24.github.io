import { defineConfig } from 'vitepress';
import { sidebar } from './sidebar';
import { tsConfigPaths, vpComponentAlias } from './alias';
import Unocss from 'unocss/vite';
import Inspect from 'vite-plugin-inspect';
import postsJson from '../data/posts.json';
import notesJson from '../data/notes.json';

export default defineConfig({
  srcDir: 'press',
  outDir: 'dist',
  cacheDir: 'node_modules/.vitepress_cache',
  cleanUrls: true,
  rewrites: {
    'posts/index.md': 'posts.md',
    'notes/index.md': 'notes.md',
  },

  title: '小凡の网络日志',
  description: '这个人很懒,什么描述都没有留下',
  head: [
    ['link', { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' }],
  ],

  themeConfig: {
    sidebar,
    externalLinkIcon: true,
    logo: { light: '/images/ai.jpg', dark: '/images/flame.jpg' },
    nav: [
      { text: '日常', link: '/posts/', activeMatch: '^/posts' },
      { text: '笔记', link: '/notes/', activeMatch: '^/notes' },
      { text: '关于', link: '/about' },
    ],
    outline: { label: '在本页', level: [2, 3] },
    sidebarMenuLabel: '目录',
    returnToTopLabel: '返回顶部',
    darkModeSwitchLabel: '深色模式',
  },

  vite: {
    resolve: {
      alias: [...tsConfigPaths, ...vpComponentAlias],
    },
    plugins: [
      Inspect(),
      Unocss({
        // patch: avoid extractor the content in default theme
        content: {
          pipeline: {
            include: ['../.vitepress/**/*.vue', '../demos/**/*.vue', '**/*.md'],
          },
        },
      }),
    ],
  },

  transformPageData({ relativePath, frontmatter }) {
    const isPosts = relativePath.startsWith('posts');
    const fileUrl = `/${relativePath.replace(/\.md$/, '')}`;
    const mdMeta = getMarkdownMeta(fileUrl, isPosts ? postsJson : notesJson);
    const presets: Record<string, any> = isPosts
      ? {
          center: true,
          prev: mdMeta?.prev,
          next: mdMeta?.next,
        }
      : {
          lastUpdateTime: mdMeta?.lastUpdateTime,
        };
    return {
      frontmatter: {
        ...presets,
        ...frontmatter,
      },
    };
  },
});

function getMarkdownMeta(fileUrl: string, press: MarkdownMetaArr) {
  const index = press.findIndex(({ link }) => link === fileUrl);
  if (index > -1) {
    let prev, next;
    if (press.length > 1) {
      prev =
        index > 0
          ? {
              link: press[index - 1].link,
              text: press[index - 1].title,
            }
          : void 0;
      next =
        index < press.length - 1
          ? {
              link: press[index + 1].link,
              text: press[index + 1].title,
            }
          : void 0;
    }
    const lastUpdateTime = press[index].lastUpdateTime;
    return { prev, next, lastUpdateTime };
  }
}
