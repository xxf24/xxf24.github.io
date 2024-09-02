import process from 'node:process';
import { execSync } from 'node:child_process';
import { dirname } from 'node:path';
import fs from 'fs-extra';
import fg from 'fast-glob';
import gm from 'gray-matter';

const DefaultFromDir = `${process.cwd()}/press`.replace(/\\/g, '/');
const DefaultSaveDir = `${process.cwd()}/.vitepress/data`.replace(/\\/g, '/');
const DefaultExcerpt = '<!--more-->';

const RegexCoverImage = /(?<=!\[.*]\()(.+)(?=\))/g;
const RegexExcerptImage = /!\[(.*?)]\((.*?)\)/g;

async function markdownExporter(cwd = DefaultFromDir) {
  const files = await fg(['**/*.md', '!index.md'], { cwd });
  const items = await Promise.all(
    files.map(filepath => {
      const slug = filepath.split('/')[0];
      const path = `${cwd}/${filepath}`;
      const { data, excerpt, content } = gm.read(path, {
        excerpt: DefaultExcerpt,
      });
      const { date, title, description, cover, category, tags, draft } = data;
      if (draft || !date || !title) {
        return;
      }
      return {
        slug,
        date: new Date(Date.parse(date)).toISOString(),
        lastUpdateTime: getLastUpdateTime(path),
        link: `/${filepath.replace(/\.md$/, '')}`,
        title,
        category,
        tags,
        cover: cover ?? content.match(RegexCoverImage) ?? undefined,
        description: description ?? formatExcerpt(excerpt),
      };
    }),
  );

  return items
    .filter(Boolean)
    .sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
    .reduce(
      (acc, cur) => {
        const { slug, ...rest } = cur;
        acc[slug] ? acc[slug].push(rest) : (acc[slug] = [rest]);
        return acc;
      },
      {
        posts: [],
        notes: [],
      },
    );
}

function formatExcerpt(excerpt, limit = 100) {
  if (!excerpt) {
    return;
  }
  const result = excerpt
    .replaceAll(RegexExcerptImage, '')
    .replaceAll(/[\n\r]/g, '');
  return result.length > limit ? `${result.slice(0, limit)}...` : result;
}

function getLastUpdateTime(filepath) {
  try {
    const dir = dirname(filepath);
    const cmd = `cd ${dir} && git log -1 --pretty="format:%ci" ${filepath}`;
    const lastUpdateTime = execSync(cmd, { encoding: 'utf-8' });
    return new Date(lastUpdateTime.trim()).toISOString();
  } catch {}
}

function saveToJson(items, saveDir = DefaultSaveDir) {
  Object.keys(items).forEach(key => {
    const saveTo = `${saveDir}/__${key}.json`;
    fs.outputJsonSync(saveTo, items[key], { spaces: 2 });
    console.log(`dump ${items[key].length} ${key} to ${saveTo}`);
  });
}

function run() {
  markdownExporter()
    .then(res => saveToJson(res))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });
}

run();
