import { FastifyRequest, FastifyReply } from 'fastify';
import { createTeamService, getAllTeamsService } from '../services/teamService.js';
import { Team } from '../lib/prisma/generated/prisma/client.js';

export async function testResponse(req: FastifyRequest, res: FastifyReply) {
    try {
        return res.status(200).send({ message: 'ok' });
    } catch (error) {
        return res.status(500).send({ message: 'Error connecting to server', error });
    }
}

export async function createTeam(req: FastifyRequest<{Body: Team}>, res: FastifyReply) {
    try {
        const {id, name, basedAt, createdAt} = req.body
        const data = await createTeamService({id, name, basedAt, createdAt});

        if (!data) return res.status(400).send({ message: 'Missing data' });

        return res.status(201).send({ message: 'Team created successfully', data });
    } catch (error) {
        return res.status(500).send({ message: 'Internal server error', error });
    }
}

export async function getAllTeams(req: FastifyRequest, res: FastifyReply) {
    try {
        const data = await getAllTeamsService();

        if (!data) return res.status(404).send({ message: 'Teams not found' });

        return res.status(200).send(data);
    } catch (error) {
        return res.status(500).send({ message: 'Internal server error', error });
    }
}