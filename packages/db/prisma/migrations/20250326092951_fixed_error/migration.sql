/*
  Warnings:

  - You are about to drop the column `disbaled` on the `website` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "website" DROP COLUMN "disbaled",
ADD COLUMN     "disabled" BOOLEAN NOT NULL DEFAULT false;
