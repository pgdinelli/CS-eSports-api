import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { createTeam, deleteTeam, findTeamById, getAllTeams } from '../controllers/teamController.js';
import { testResponse } from '../controllers/teamController.js';

async function teamRoutes(fastify: FastifyInstance, options: FastifyPluginOptions) {
    fastify.get('/test', testResponse);
    fastify.get('/', getAllTeams);
    fastify.post('/', createTeam);
    fastify.get('/:id', findTeamById);
    fastify.delete('/:id', deleteTeam);
}

export {teamRoutes}