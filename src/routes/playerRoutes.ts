import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { testResponse, getAllPlayers, findPlayerById, deletePlayer, createPlayer, updatePlayer } from '../controllers/playerController.js';

async function playerRoutes(fastify: FastifyInstance, options: FastifyPluginOptions) {
    fastify.get('/test', testResponse);
    fastify.get('/', getAllPlayers);
    fastify.get('/:id', findPlayerById);
    fastify.post('/', createPlayer);
    fastify.put('/:id', updatePlayer);
    fastify.delete('/:id', deletePlayer);
}

export {playerRoutes};
