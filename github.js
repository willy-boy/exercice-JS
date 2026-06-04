async function getRepos(username) {
  const response = await fetch('https://api.github.com/users/willy-boy/repos');
  const repos = await response.json();
  repos
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 5)
    .forEach(repo => {
      console.log(`⭐ ${repo.stargazers_count} — ${repo.name} : ${repo.description}`);
    });
}
getRepos('willy-boy');