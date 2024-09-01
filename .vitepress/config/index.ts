import { defineConfig } from 'vitepress';
import { tsConfigPaths } from './alias';

export default defineConfig({
  srcDir: 'press',
  outDir: 'dist',
  cacheDir: 'node_modules/.vitepress_cache',

  title: '小凡の网络日志',
  description: '这个人很懒,什么描述都没有留下',
  head: [],

  themeConfig: {},

  vite: {
    resolve: {
      alias: [...tsConfigPaths],
    },
  },
});
