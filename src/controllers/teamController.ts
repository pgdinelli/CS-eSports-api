import { FastifyRequest, FastifyReply } from 'fastify';
import { getAllTeamsService } from '../services/teamService.js';

export async function testResponse(req: FastifyRequest, res: FastifyReply) {
    try {
        return res.status(200).send({ message: 'ok' });
    } catch (error) {
        return res.status(500).send({ message: 'Error connecting to server', error });
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