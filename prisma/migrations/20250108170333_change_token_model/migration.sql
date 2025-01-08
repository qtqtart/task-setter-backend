/*
  Warnings:

  - You are about to drop the column `payload` on the `tokens` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "tokens_payload_key";

-- AlterTable
ALTER TABLE "tokens" DROP COLUMN "payload";
