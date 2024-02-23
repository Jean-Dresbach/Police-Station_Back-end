/*
  Warnings:

  - You are about to alter the column `CPF` on the `criminals` table. The data in that column could be lost. The data in that column will be cast from `Char(14)` to `Char(11)`.

*/
-- AlterTable
ALTER TABLE "criminals" ALTER COLUMN "CPF" SET DATA TYPE CHAR(11);
