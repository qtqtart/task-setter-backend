/*
  Warnings:

  - You are about to drop the `_TaskViewers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_TaskViewers" DROP CONSTRAINT "_TaskViewers_A_fkey";

-- DropForeignKey
ALTER TABLE "_TaskViewers" DROP CONSTRAINT "_TaskViewers_B_fkey";

-- DropTable
DROP TABLE "_TaskViewers";

-- CreateTable
CREATE TABLE "_TaskParticiants" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_TaskParticiants_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_TaskParticiants_B_index" ON "_TaskParticiants"("B");

-- AddForeignKey
ALTER TABLE "_TaskParticiants" ADD CONSTRAINT "_TaskParticiants_A_fkey" FOREIGN KEY ("A") REFERENCES "tasks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TaskParticiants" ADD CONSTRAINT "_TaskParticiants_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
