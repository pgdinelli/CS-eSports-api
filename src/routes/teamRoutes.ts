import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { createTeam, getAllTeams } from '../controllers/teamController.js';
import { testResponse } from '../controllers/teamController.js';

async function teamRoutes(fastify: FastifyInstance, options: FastifyPluginOptions) {
    fastify.get('/test', testResponse);
    fastify.get('/', getAllTeams);
    fastify.post('/', createTeam);
}

export {teamRoutes}