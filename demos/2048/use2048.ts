import {
  onScopeDispose,
  onUnmounted,
  reactive,
  toRefs,
  watch,
  type MaybeRefOrGetter,
} from 'vue';
import { G2048Model } from './model';
import { useEventListener, useStorage } from '@vueuse/core';
import { useMoveCommand } from '../shared';

export interface Use2048Options {
  size?: number;
  bestScoreKey?: string;
  prevStateKey?: string;
  saveWhenExit?: boolean;
}

export function use2048(
  element: MaybeRefOrGetter<HTMLElement | undefined | null>,
  options: Use2048Options = {},
) {
  const {
    size = 4,
    bestScoreKey = '2048_best_score',
    prevStateKey = '2048_prev_state',
    saveWhenExit = true,
  } = options;

  const model = reactive(new G2048Model());
  const { gg, score, tiles, times } = toRefs(model);
  const best = useStorage(bestScoreKey, score.value);

  useMoveCommand({
    element,
    onMoved: model.move.bind(model),
  });

  const stops = [
    watch(score, () => (best.value = Math.max(best.value, score.value))),
    useEventListener('keydown', event => {
      if (gg.value && event.key === 'Enter') {
        model.init({ size });
      }
    }),
  ];

  if (saveWhenExit) {
    let hasSaved = false;
    const saveFn = () => {
      if (hasSaved) {
        return;
      }
      hasSaved = true;
      localStorage.setItem(
        prevStateKey,
        JSON.stringify({
          size,
          times: times.value,
          score: score.value,
          tiles: tiles.value.map(({ x, y, score }) => ({ x, y, score })),
        }),
      );
    };
    onUnmounted(() => saveFn());
    stops.push(useEventListener('pagehide', saveFn));
  }

  onScopeDispose(() => stops.forEach(stop => stop()));

  const load = () => {
    try {
      model.init(JSON.parse(localStorage.getItem(prevStateKey) || ''));
    } catch {
      model.init({ size });
    } finally {
      localStorage.removeItem(prevStateKey);
    }
  };

  return {
    gg,
    score,
    times,
    tiles,
    best,
    init: model.init.bind(model),
    back: model.back.bind(model),
    load,
  };
}
