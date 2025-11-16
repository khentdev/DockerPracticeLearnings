-- CreateTable
CREATE TABLE "Todos" (
    "id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "notes" TEXT,

    CONSTRAINT "Todos_pkey" PRIMARY KEY ("id")
);
