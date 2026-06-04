const fs = require('node:fs/promises');

async function writeRepos(username) {
  const response = await fetch(`https://api.github.com/users/${username}/repos`);
  const data = await response.json();
const keepData = data.map(repo => ({
    name: repo.name,
    description: repo.description,
    stars: repo.stargazers_count
  }));

  const dataJson = JSON.stringify(keepData, null, 2);
  await fs.writeFile('writeFromGithub.json', dataJson, 'utf-8');
  console.log(`${keepData.length} repos exportés dans writeFromGithub.json`);
}
writeRepos('torvalds');
