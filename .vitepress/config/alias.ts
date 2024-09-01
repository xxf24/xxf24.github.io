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
