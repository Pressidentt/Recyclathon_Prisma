/*
  Warnings:

  - You are about to drop the column `materialId` on the `Bin` table. All the data in the column will be lost.
  - Added the required column `materialId` to the `BinType` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Bin" DROP CONSTRAINT "Bin_materialId_fkey";

-- AlterTable
ALTER TABLE "Bin" DROP COLUMN "materialId";

-- AlterTable
ALTER TABLE "BinType" ADD COLUMN     "materialId" INTEGER NOT NULL;
