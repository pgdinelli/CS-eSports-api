import { prisma } from "../lib/prisma/prisma.js";
import { Team } from "../lib/prisma/generated/prisma/client.js";

export async function getAllTeamsService() {
    const data = await prisma.team.findMany();

    if(!data) return;
    return data
}