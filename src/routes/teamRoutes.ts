import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { createTeam, deleteTeam, findTeamById, getAllTeams, updateTeam } from '../controllers/teamController.js';
import { testResponse } from '../controllers/teamController.js';

async function teamRoutes(fastify: FastifyInstance, options: FastifyPluginOptions) {
    fastify.get('/test', testResponse);
    fastify.get('/', getAllTeams);
    fastify.post('/', createTeam);
    fastify.get('/:id', findTeamById);
    fastify.put('/:id', updateTeam);
    fastify.delete('/:id', deleteTeam);
}

export {teamRoutes}