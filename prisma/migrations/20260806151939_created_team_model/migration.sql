-- CreateTable
CREATE TABLE "tb_teams" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "basedAt" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tb_teams_pkey" PRIMARY KEY ("id")
);
