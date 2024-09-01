import { h } from 'vue';
import type { Theme } from 'vitepress';
import DefaultTheme from 'vitepress/theme';

export default {
  Layout: () => h(DefaultTheme.Layout),
  enhanceApp(ctx) {},
} satisfies Theme;
