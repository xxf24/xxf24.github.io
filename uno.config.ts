import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
  transformerVariantGroup,
} from 'unocss';

export default defineConfig({
  presets: [
    presetAttributify(),
    presetUno(),
    presetIcons({
      scale: 1.2,
    }),
  ],
  transformers: [transformerVariantGroup()],
  shortcuts: {
    'flex-center': 'flex items-center justify-center',
    'border-base': 'border border-solid border-$vp-c-border',
  },
});
