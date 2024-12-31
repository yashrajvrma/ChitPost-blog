/*
  Warnings:

  - A unique constraint covering the columns `[userId,contentId]` on the table `Favourite` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Favourite_userId_contentId_key" ON "Favourite"("userId", "contentId");
