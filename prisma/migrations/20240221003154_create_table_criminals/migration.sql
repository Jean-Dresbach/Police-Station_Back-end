-- CreateTable
CREATE TABLE "criminals" (
    "id" UUID NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "surname" VARCHAR(100) NOT NULL,
    "CPF" CHAR(11) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "criminals_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "criminals_CPF_key" ON "criminals"("CPF");
