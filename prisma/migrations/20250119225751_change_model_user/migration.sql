/*
  Warnings:

  - You are about to drop the column `thumbnail_url` on the `projects` table. All the data in the column will be lost.
  - You are about to drop the column `avatar` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "projects" DROP COLUMN "thumbnail_url",
ADD COLUMN     "preview_s3_url" TEXT;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "avatar",
ADD COLUMN     "avatar_s3_url" TEXT;
