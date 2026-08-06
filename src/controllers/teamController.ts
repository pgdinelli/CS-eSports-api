import { FastifyRequest, FastifyReply } from 'fastify';
import { createTeamService, deleteTeamService, findTeamByIdService, getAllTeamsService, updateTeamService, } from '../services/teamService.js';
import RequestParams from '../utils/interfaces/RequestParams.js';
import { Team } from '../lib/prisma/generated/prisma/client.js';
import TeamBodyProps from '../utils/interfaces/TeamBodyProps.js';

export async function testResponse(req: FastifyRequest, res: FastifyReply) {
    try {
        return res.status(200).send({ message: 'ok' });
    } catch (error) {
        return res.status(500).send({ message: 'Error connecting to server', error });
    }
}

export async function createTeam(req: FastifyRequest<{ Body: Team }>, res: FastifyReply) {
    try {
        const { id, name, basedAt, createdAt } = req.body
        const data = await createTeamService({ id, name, basedAt, createdAt });

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

export async function findTeamById(req: FastifyRequest<{ Params: RequestParams }>, res: FastifyReply) {
    try {
        const id = req.params.id
        const data = await findTeamByIdService({ id });

        if (!data) res.status(404).send({ message: 'Team not found' });

        return res.status(200).send(data);
    } catch (error) {
        return res.status(500).send({ message: 'Internal server error', error });
    }
}

export async function updateTeam(req: FastifyRequest<{ Params: RequestParams, Body: TeamBodyProps }>, res: FastifyReply) {
    try {
        const id = req.params.id;
        if (!id) return res.status(400).send({ message: 'Missing Id field' });

        const { name, basedAt } = req.body

        const data = await updateTeamService({ id }, { name, basedAt });
        if (!data) return res.status(404).send({ message: 'Team not found' });

        return res.status(200).send({ message: 'Data updated successfully', data });
    } catch (error) {
        return res.status(500).send({ message: 'Internal server error', error });
    }
}

export async function deleteTeam(req: FastifyRequest<{ Params: RequestParams }>, res: FastifyReply) {
    try {
        const id = req.params.id
        if (!id) return res.status(400).send({ message: 'Missing ID field' });

        const deletedData = await deleteTeamService({ id });
        if (!deletedData) return res.status(204).send();

        return res.status(204).send();
    } catch (error) {
        return res.status(500).send({ message: 'Internal server error', error });
    }
}