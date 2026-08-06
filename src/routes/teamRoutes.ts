import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { getAllTeams } from '../controllers/teamController.js';
import { testResponse } from '../controllers/teamController.js';

async function teamRoutes(fastify: FastifyInstance, options: FastifyPluginOptions) {
    fastify.get('/test', testResponse);
    fastify.get('/', getAllTeams);
}

export {teamRoutes}