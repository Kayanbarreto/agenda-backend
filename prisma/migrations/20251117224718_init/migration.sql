-- CreateTable
CREATE TABLE "Agendamento" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "servico" TEXT NOT NULL,
    "data" TEXT NOT NULL,
    "hora" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Agendamento_pkey" PRIMARY KEY ("id")
);
