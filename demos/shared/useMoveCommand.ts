import { type MaybeRefOrGetter, onScopeDispose, ref, watch } from 'vue';
import { useEventListener, useSwipe } from '@vueuse/core';

export type MoveCommand = 'up' | 'down' | 'left' | 'right';

export interface MoveCommandOptions {
  enableKeyboardInput?: boolean;
  enableTouchSwipe?: boolean;
  element?: MaybeRefOrGetter<HTMLElement | undefined | null>;
  onMoved?: (direction: MoveCommand) => void;
}

const EventKeyMap: Record<string, MoveCommand> = {
  ArrowUp: 'up',
  ArrowDown: 'down',
  ArrowLeft: 'left',
  ArrowRight: 'right',
  w: 'up',
  a: 'left',
  s: 'down',
  d: 'right',
};

export function useMoveCommand(options: MoveCommandOptions = {}) {
  const {
    enableKeyboardInput = true,
    enableTouchSwipe = true,
    element,
    onMoved,
  } = options;

  const command = ref<MoveCommand>();
  const _stops: Array<() => void> = [];
  if (enableKeyboardInput) {
    _stops.push(
      useEventListener('keydown', event => {
        const direction = EventKeyMap[event.key];
        if (direction) {
          event.preventDefault();
          onMoved?.(direction);
          command.value = direction;
        }
      }),
    );
  }
  if (enableTouchSwipe) {
    const { direction, stop: stopSwipe } = useSwipe(element);
    _stops.push(stopSwipe);
    _stops.push(
      watch(direction, value => {
        if (value && value !== 'none') {
          onMoved?.(value);
          command.value = value;
        }
      }),
    );
  }

  const stop = () => _stops.forEach(fn => fn());
  onScopeDispose(() => stop());

  return {
    stop,
    command,
  };
}
