/*
  Warnings:

  - A unique constraint covering the columns `[anonymousId,newsId]` on the table `Like` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[anonymousId,videoId]` on the table `Like` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_userId_fkey";

-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "Like_userId_fkey";

-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "anonymousId" TEXT,
ALTER COLUMN "userId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Like" ADD COLUMN     "anonymousId" TEXT,
ALTER COLUMN "userId" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Like_anonymousId_newsId_key" ON "Like"("anonymousId", "newsId");

-- CreateIndex
CREATE UNIQUE INDEX "Like_anonymousId_videoId_key" ON "Like"("anonymousId", "videoId");

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
