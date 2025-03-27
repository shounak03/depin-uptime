/*
  Warnings:

  - You are about to drop the column `status` on the `web_status` table. All the data in the column will be lost.
  - Added the required column `state` to the `web_status` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "web_status" DROP COLUMN "status",
ADD COLUMN     "state" "Status" NOT NULL;
