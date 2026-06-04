const fs = require('fs');

const csv = fs.readFileSync('paris.csv', 'utf-8');
const lines = csv.split('\n').slice(1); // ignore l'en-tête

const paris = lines
  .map(line => {
    const [id, joueur, mise, cote, statut] = line.split(',');
    return { id, joueur, mise: parseFloat(mise), cote: parseFloat(cote), statut: statut.trim() };
  })

const parisGagnants = paris.filter(p => p.statut === 'gagnant');
const gainsTotaux = parisGagnants.reduce((sum, p) => sum + p.mise * p.cote, 0);
const parisPerdants = paris.filter(p => p.statut === 'perdant');
const pertesTotales = parisPerdants.reduce((sum, p) => sum + p.mise, 0);
const meilleurPari = parisGagnants.reduce((max, p) => {
    return (p.mise *p.cote) > (max.mise * max.cote) ? p : max;
});

console.log(`${parisGagnants.length} paris gagnants, gains à reverser : ${gainsTotaux}€`);
console.log(`${parisPerdants.length} paris perdants, mises perdues : ${pertesTotales}€`);
console.log(`Meilleur gain : ${meilleurPari.joueur} ,${meilleurPari.mise * meilleurPari.cote}€`);