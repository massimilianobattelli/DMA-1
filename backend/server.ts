// npx ts-node server.ts
import fastify, { FastifyInstance } from 'fastify';
import { Controller } from './controller/controller'

const app: FastifyInstance = fastify();
new Controller(app)

// Avvio del server
app.listen(3001, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server Fastify in esecuzione su ${address}`);
});
