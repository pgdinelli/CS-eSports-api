import { prisma } from "../lib/prisma/prisma.js";
import { Team } from "../lib/prisma/generated/prisma/client.js";

import RequestParams from '../utils/interfaces/RequestParams.js'

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