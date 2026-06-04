require('dotenv').config();
const fs = require('node:fs/promises');

async function getRepos(username) {
  const response = await fetch(`https://api.github.com/users/${username}/repos`, {
    headers: {
      Authorization: `token ${process.env.GITHUB_TOKEN}`
    }
  });
  const repos = await response.json();
  const result = await Promise.all(
    repos.map(async (repo) => {
        const res = await fetch(repo.languages_url, {
            headers: {
                Authorization: `token ${process.env.GITHUB_TOKEN}`
            }
        });
        const languages = await res.json();
        return {
            name: repo.name,
            languages: Object.keys(languages)
        };
    }));
    result.forEach(repo => {
        console.log(`${repo.name} - ${repo.languages.join(', ')}`);
    });
}

getRepos('torvalds');