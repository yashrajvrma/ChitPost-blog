/*
  Warnings:

  - You are about to drop the column `Status` on the `Favourite` table. All the data in the column will be lost.
  - Added the required column `status` to the `Favourite` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Favourite" DROP COLUMN "Status",
ADD COLUMN     "status" BOOLEAN NOT NULL;
