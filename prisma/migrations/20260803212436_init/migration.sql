-- CreateTable
CREATE TABLE "tb_players" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "org" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tb_players_pkey" PRIMARY KEY ("id")
);
