const http = require('http');

const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/webhook') {
    let body = '';

    req.on('data', chunk => { body += chunk; });

    req.on('end', () => {
      const payload = JSON.parse(body);
      console.log('Webhook reçu :', payload);

      if (payload.statut === 'paiement_ok') {
        console.log(`✅ Paiement confirmé pour le joueur ${payload.userId}`);
      }

      if (payload.statut === 'paiement_failed') {
        console.log(`❌ Paiement refusé pour le joueur ${payload.userId}, montant : ${payload.montant}€`);
      }

      res.writeHead(200);
      res.end(JSON.stringify({ received: true }));
    });
  } else {
    res.writeHead(404);
    res.end('Not found');
  }
});

server.listen(3000, () => console.log('Serveur webhook sur http://localhost:3000'));