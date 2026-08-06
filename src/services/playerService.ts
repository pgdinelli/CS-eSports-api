import { prisma } from '../lib/prisma/prisma.js';

import RequestParams from '../utils/interfaces/RequestParams.js';
import PlayerBodyProps from '../utils/interfaces/PlayerBodyProps.js';
import { Player, Prisma } from '../lib/prisma/generated/prisma/client.js';

export async function createPlayerService({ id, name, org, createdAt }: Player) {
    try {

        const playerExists = await prisma.player.findFirst({
            where: {
                name,
                org
            }
        });

        if (playerExists) return; // Prevents player of being created if already exists another player with same name and org

        const data = await prisma.player.create({
            data: {
                id,
                name,
                org,
                createdAt
            }
        });

        return data;
    } catch (error) {
        return;
    }
}

export async function getAllPlayersService() {
    try {
        const data = await prisma.player.findMany();

        if (!data) return;

        return data;
    } catch (error) {
        return;
    }
}

export async function findPlayerByIdService({ id }: RequestParams) {

    try {
        const data = await prisma.player.findUnique({
            where: {
                id
            }
        });

        if(!id) return;

        return data;
    } catch (error) {
        return;
    }
}

export async function updatePlayerService({ id }: RequestParams, { name, org }: PlayerBodyProps) {
    try {

        const dataToUpdate = await prisma.player.update({
            where: {
                id
            },
            data: {
                name,
                org
            }
        });

        return dataToUpdate;
    } catch (error) {
        return;
    }
}

export async function deletePlayerService({ id }: RequestParams) {

    try {
        const dataToDelete = await prisma.player.delete({
            where: {
                id
            }
        });

        return dataToDelete;
    } catch (error) {
        // Prisma sends a specific error when it doesn't find data to delete, which prevents the server from sending http status codes
        // The following line treats Prisma's error code, which lets the server send the correct http status as response
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') return;

        return;
    }

}