import { defineConfig } from 'vitepress';
import { sidebar } from './sidebar';
import { tsConfigPaths, vpComponentAlias } from './alias';
import Unocss from 'unocss/vite';
import Inspect from 'vite-plugin-inspect';

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
    logo: { light: '/imgs/ai.jpg', dark: '/imgs/flame.jpg' },
    nav: [
      { text: '日常', link: '/posts/', activeMatch: '^/posts' },
      { text: '笔记', link: '/notes/', activeMatch: '^/notes' },
      { text: '关于', link: '/about' },
    ],
    outline: { label: '在本页' },
    sidebarMenuLabel: '目录',
    returnToTopLabel: '返回顶部',
    darkModeSwitchLabel: '深色模式',
  },

  vite: {
    resolve: {
      alias: [...tsConfigPaths, ...vpComponentAlias],
    },
    plugins: [Unocss(), Inspect()],
  },
});
