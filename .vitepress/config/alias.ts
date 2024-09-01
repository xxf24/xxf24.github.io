import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const cwd = fileURLToPath(new URL('../..', import.meta.url));

export function r(p = '', base = cwd) {
  return resolve(base, p).replace(/\\/g, '/');
}

const ROOT_DIR = r();
const MAIN_DIR = r('.vitepress');

export const tsConfigPaths = [
  { find: /^~\//, replacement: `${ROOT_DIR}/` },
  { find: /^@\//, replacement: `${MAIN_DIR}/` },
];

export const vpComponentAlias = overrideComponents([
  { from: 'VPSwitchAppearance', to: 'ToggleDarkMode' },
  { from: 'VPDocFooter' },
]);

// @see https://vitepress.dev/guide/extending-default-theme#overriding-internal-components
function overrideComponents(arr: { from: string; to?: string }[]) {
  return arr.map(({ from, to = from.slice(2) }) => ({
    find: new RegExp(`^.*\\/${from}\\.vue$`),
    replacement: r(`theme/components/${to}.vue`, MAIN_DIR),
  }));
}
