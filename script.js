const fs = require('fs');

const csv = fs.readFileSync('transactions.csv', 'utf-8');
const lines = csv.split('\n').slice(1); // ignore l'en-tête

const transactions = lines.map(line => {
  const [id, montant, statut] = line.split(',');
  return { id, montant: parseFloat(montant), statut };
});

const bigTransactions = transactions.filter(t => t.montant > 100);

const otherTransactions = transactions.filter(t => t.montant <= 100);

const total = bigTransactions.reduce((sum, t) => sum + t.montant, 0);

console.log(`${bigTransactions.length} transactions au dessus de 100€, total : ${total}€`);
console.log(`${otherTransactions.length} transactions ignorées:`);
otherTransactions.forEach(t => {
  console.log(` - id:${t.id}, montant:${t.montant}€, statut:${t.statut}`)
});

  


