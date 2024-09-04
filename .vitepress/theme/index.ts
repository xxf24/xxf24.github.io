import { h, type App, type Component } from 'vue';
import type { Theme } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
import DocHeader from './components/DocHeader.vue';
import DocCtrlPanel from './components/DocCtrlPanel.vue';
import './styles/main.css';
import 'uno.css';

export default {
  Layout: () =>
    h(DefaultTheme.Layout, null, {
      'doc-before': () => [h(DocCtrlPanel), h(DocHeader)],
    }),
  enhanceApp(ctx) {
    autoSetupComponents(ctx.app);
  },
} satisfies Theme;

function autoSetupComponents(app: App) {
  // @ts-ignore
  const items: Record<string, Component> = import.meta.glob(
    ['./components/**/*.vue', './pages/**/*.vue'],
    {
      import: 'default',
      eager: true,
    },
  );
  Object.values(items).forEach(item => {
    if (item.name) {
      app.component(item.name, item);
    }
  });
}
