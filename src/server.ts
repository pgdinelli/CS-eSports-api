import Fastify from 'fastify';
import cors from '@fastify/cors';
import { playerRoutes } from './routes/playerRoutes.js';
import { teamRoutes } from './routes/teamRoutes.js';

const fastify = Fastify({
    logger: true
});

await fastify.register(cors, {
    origin: '*'
});

await fastify.register(playerRoutes, { prefix: '/api/players' });
await fastify.register(teamRoutes, { prefix: '/api/teams' });

const start = async () => {
  try {
    await fastify.listen({ port: 3000 })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start();
