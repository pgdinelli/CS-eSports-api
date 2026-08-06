import { prisma } from "../lib/prisma/prisma.js";
import { Team } from "../lib/prisma/generated/prisma/client.js";

import RequestParams from '../utils/interfaces/RequestParams.js'
import TeamBodyProps from "../utils/interfaces/TeamBodyProps.js";

export async function createTeamService({ id, name, basedAt, createdAt }: Team): Promise<Team> {
    
    const teamExists = await prisma.team.findFirst({
        where: {
            name,
            basedAt
        }
    });

    if(teamExists) throw new Error("Team already exists");
    
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

export async function findTeamByIdService({ id }: RequestParams): Promise<Team> {
    const team = await prisma.team.findFirst({
        where: {
            id,
        }
    });

    if(!team) throw new Error("Unable to find team");

    return team;
}

export async function updateTeamService({ id }: RequestParams, { name, basedAt }: TeamBodyProps): Promise<Team> {
    const teamToUpdate = await prisma.team.update({
        where: {
            id
        }, 
        data: {
            name,
            basedAt
        }
    });

    if(!teamToUpdate) throw new Error("Unable to update team");

    return teamToUpdate;
}

export async function deleteTeamService({id}: RequestParams): Promise<Team> {
    
    if(!id) throw new Error("Unable to delete");
    
    const dataToDelete = await prisma.team.delete({
        where: {
            id
        }
    });

    if(!dataToDelete) throw new Error("Unable to delete");

    return dataToDelete;
}