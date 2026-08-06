import { prisma } from "../lib/prisma/prisma.js";
import { Prisma, Team } from "../lib/prisma/generated/prisma/client.js";

import RequestParams from '../utils/interfaces/RequestParams.js'
import TeamBodyProps from "../utils/interfaces/TeamBodyProps.js";

export async function createTeamService({ id, name, basedAt, createdAt }: Team): Promise<Team | null> {

    const teamExists = await prisma.team.findFirst({
        where: {
            name,
            basedAt
        }
    });

    if (teamExists) return null;

    const newTeam = prisma.team.create({
        data: {
            id,
            name,
            basedAt,
            createdAt
        }
    });

    return newTeam;
}

export async function getAllTeamsService() {
    const data = await prisma.team.findMany();

    if (!data) return;
    return data;
}

export async function findTeamByIdService({ id }: RequestParams): Promise<Team | null> {
    const team = await prisma.team.findFirst({
        where: {
            id,
        }
    });

    if (!team) return null;

    return team;
}

export async function updateTeamService({ id }: RequestParams, { name, basedAt }: TeamBodyProps): Promise<Team | null> {
    try {
        const teamToUpdate = await prisma.team.update({
            where: {
                id
            },
            data: {
                name,
                basedAt
            }
        });

        if (!teamToUpdate) return null;

        return teamToUpdate;
    } catch (error) {
        // Prisma sends a specific error when it doesn't find data to delete, which prevents the server from sending http status codes
        // The following line treats Prisma's error code, which lets the server send the correct http status as response
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') return null;

        return null;
    }
}

export async function deleteTeamService({ id }: RequestParams): Promise<Team | null> {

    try {
        if (!id) throw new Error("Unable to delete");

        const dataToDelete = await prisma.team.delete({
            where: {
                id
            }
        });

        if (!dataToDelete) return null;

        return dataToDelete;
    } catch (error) {
        // Prisma sends a specific error when it doesn't find data to delete, which prevents the server from sending http status codes
        // The following line treats Prisma's error code, which lets the server send the correct http status as response
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') return null;

        return null;
    }

}