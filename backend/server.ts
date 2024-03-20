// npx ts-node server.ts
import fastify, { FastifyInstance } from 'fastify';
import { Router } from './router/router';

const server: FastifyInstance = fastify();

new Router(server)

server.listen(3001, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server Fastify in esecuzione su ${address}`);
});
