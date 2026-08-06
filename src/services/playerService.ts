import { prisma } from '../lib/prisma/prisma.js';

import RequestParams from '../utils/interfaces/RequestParams.js';
import PlayerBodyProps from '../utils/interfaces/PlayerBodyProps.js';
import { Player, Prisma } from '../lib/prisma/generated/prisma/client.js';

export async function createPlayerService({ id, name, org, createdAt }: Player): Promise<Player | null> {

    const playerExists = await prisma.player.findFirst({
        where: {
            name,
            org
        }
    });

    if (playerExists) return null; // Prevents player of being created if already exists another player with same name and org

    const data = await prisma.player.create({
        data: {
            id,
            name,
            org,
            createdAt
        }
    });

    return data;
}

export async function getAllPlayersService(): Promise<Player[] | null> {
    const data = await prisma.player.findMany();

    if (!data) return null;

    return data;
}

export async function findPlayerByIdService({ id }: RequestParams): Promise<Player | null> {
    const data = await prisma.player.findUnique({
        where: {
            id
        }
    });

    if (!data) return null;

    return data;
}

export async function updatePlayerService({ id }: RequestParams, { name, org }: PlayerBodyProps): Promise<Player | null> {

    const dataToUpdate = await prisma.player.update({
        where: {
            id
        },
        data: {
            name,
            org
        }
    });

    if (!dataToUpdate) return null;

    return dataToUpdate;
}

export async function deletePlayerService({ id }: RequestParams): Promise<Player | null> {

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
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') return null;

        return null;
    }

}