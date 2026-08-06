import { FastifyRequest, FastifyReply } from 'fastify';
import { createPlayerService, deletePlayerService, findPlayerByIdService, getAllPlayersService, updatePlayerService } from '../services/playerService.js';
import RequestParams from '../utils/interfaces/RequestParams.js';
import { Player } from '../lib/prisma/generated/prisma/client.js';

export async function testResponse(req: FastifyRequest, res: FastifyReply) {
    try {
        return res.code(200).send({ ok: true });
    } catch (error) {
        return res.status(500).send({ message: 'Internal Server Error', error });
    }
}

export async function createPlayer(req: FastifyRequest<{ Body: Player }>, res: FastifyReply) {
    try {
        const { id, name, org, createdAt } = req.body;

        const newData = await createPlayerService({ id, name, org, createdAt });

        if (!newData) return res.status(400).send({ message: 'Data missing' });

        return res.status(201).send({ message: 'Data created successfully', newData });
    } catch (error) {
        return res.status(500).send({ message: 'Error creating player', error });
    }
}

export async function getAllPlayers(req: FastifyRequest, res: FastifyReply) {
    try {
        const data = await getAllPlayersService();

        if (!data) return res.status(404).send({ message: 'Players not found' });

        return res.status(200).send(data);
    } catch (error) {
        return res.status(500).send({ message: 'Internal server error', error });
    }
}

export async function findPlayerById(req: FastifyRequest<{ Params: Player }>, res: FastifyReply) {
    try {
        const id = req.params.id;
        if (!id) return res.status(400).send({ message: 'No id' });

        const data = await findPlayerByIdService({ id });
        if (!data) return res.status(404).send({ message: 'Player not found' });

        return res.status(200).send(data);
    } catch (error) {
        return res.status(500).send({ message: 'Error finding data', error });
    }
}


export async function updatePlayer(req: FastifyRequest<{ Params: RequestParams, Body: Player }>, res: FastifyReply) {
    try {
        const id = req.params.id;
        if (!id) return res.status(400).send({ message: 'Missing ID field' });

        const { name, org } = req.body;

        const data = await updatePlayerService({ id }, { name, org });
        if (!data) return res.status(404).send({ message: 'Player not found' });

        return res.status(200).send({ message: 'Data updated successfully' });
    } catch (error) {
        return res.status(500).send({ message: 'Error updating data', error });
    }
}

export async function deletePlayer(req: FastifyRequest<{ Params: RequestParams }>, res: FastifyReply) {
    try {
        const id = req.params.id;
        if (!id) return res.status(400).send({ message: 'Missing ID field' });

        const deletedData = await deletePlayerService({ id });
        if (!deletedData) return res.status(204).send();

        return res.status(204).send();
    } catch (error) {
        return res.status(500).send({ message: 'Unable to delete data', error });
    }
}