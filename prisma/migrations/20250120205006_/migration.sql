/*
  Warnings:

  - You are about to drop the `_ProjectUsers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ProjectUsers" DROP CONSTRAINT "_ProjectUsers_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProjectUsers" DROP CONSTRAINT "_ProjectUsers_B_fkey";

-- DropTable
DROP TABLE "_ProjectUsers";

-- CreateTable
CREATE TABLE "_ProjectParticiants" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ProjectParticiants_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_ProjectParticiants_B_index" ON "_ProjectParticiants"("B");

-- AddForeignKey
ALTER TABLE "_ProjectParticiants" ADD CONSTRAINT "_ProjectParticiants_A_fkey" FOREIGN KEY ("A") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProjectParticiants" ADD CONSTRAINT "_ProjectParticiants_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
