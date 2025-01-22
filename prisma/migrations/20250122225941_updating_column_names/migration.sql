/*
  Warnings:

  - You are about to drop the column `userId` on the `Bookmark` table. All the data in the column will be lost.
  - You are about to drop the column `roleId` on the `Roles_Users` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Roles_Users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id_role,id_user]` on the table `Roles_Users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `id_user` to the `Bookmark` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_role` to the `Roles_Users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_user` to the `Roles_Users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Bookmark" DROP CONSTRAINT "Bookmark_userId_fkey";

-- DropForeignKey
ALTER TABLE "Roles_Users" DROP CONSTRAINT "Roles_Users_roleId_fkey";

-- DropForeignKey
ALTER TABLE "Roles_Users" DROP CONSTRAINT "Roles_Users_userId_fkey";

-- DropIndex
DROP INDEX "Roles_Users_roleId_userId_key";

-- AlterTable
ALTER TABLE "Bookmark" DROP COLUMN "userId",
ADD COLUMN     "id_user" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Roles_Users" DROP COLUMN "roleId",
DROP COLUMN "userId",
ADD COLUMN     "id_role" INTEGER NOT NULL,
ADD COLUMN     "id_user" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Roles_Users_id_role_id_user_key" ON "Roles_Users"("id_role", "id_user");

-- AddForeignKey
ALTER TABLE "Bookmark" ADD CONSTRAINT "Bookmark_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Roles_Users" ADD CONSTRAINT "Roles_Users_id_role_fkey" FOREIGN KEY ("id_role") REFERENCES "Roles"("id_role") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Roles_Users" ADD CONSTRAINT "Roles_Users_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User"("id_user") ON DELETE CASCADE ON UPDATE CASCADE;
