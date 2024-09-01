import process from 'node:process';
import { ofetch } from 'ofetch';
import fs from 'fs-extra';

// GitHub: owner/repo
const endPoints = [
  'vuejs/core',
  'vuejs/vitepress',
  'vueuse/vueuse',
  'unocss/unocss',
  'type-challenges/type-challenges',
  'sindresorhus/type-fest',
  'total-typescript/ts-reset',
];

const DefaultSaveTo = `${process.cwd()}/.vitepress/data/repos.json`;

async function fetchRepoData(endPoint) {
  const api = `https://api.github.com/repos/${endPoint}`;
  const res = await ofetch(api, {
    headers: {
      Accept: 'application/vnd.github.v4+json',
    },
  });
  return {
    stamp: new Date().toISOString(),
    key: endPoint,
    avatar_url: res?.owner.avatar_url,
    html_url: res.html_url,
    description: res.description,
    language: res.language,
    stargazers_count: res.stargazers_count,
    forks_count: res.forks_count,
    pushed_at: res.pushed_at,
  };
}

function run() {
  const promises = endPoints.map(endPoint => fetchRepoData(endPoint));
  Promise.all(promises)
    .then(res => {
      const items = res.reduce((prev, curr) => {
        prev[curr.key] = { ...curr, key: void 0 };
        return prev;
      }, {});
      fs.outputJSONSync(DefaultSaveTo, items, { spaces: 2 });
    })
    .catch(error => {
      console.error(error);
      process.exit(1);
    });
}

run();
