/*
  Warnings:

  - The primary key for the `Bookmark` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Bookmark` table. All the data in the column will be lost.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `firsName` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Bookmark" DROP CONSTRAINT "Bookmark_userId_fkey";

-- AlterTable
ALTER TABLE "Bookmark" DROP CONSTRAINT "Bookmark_pkey",
DROP COLUMN "id",
ADD COLUMN     "id_bookmark" SERIAL NOT NULL,
ADD CONSTRAINT "Bookmark_pkey" PRIMARY KEY ("id_bookmark");

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "firsName",
DROP COLUMN "id",
ADD COLUMN     "firstName" TEXT,
ADD COLUMN     "id_user" SERIAL NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id_user");

-- CreateTable
CREATE TABLE "Roles" (
    "id_role" SERIAL NOT NULL,
    "roleName" TEXT NOT NULL,

    CONSTRAINT "Roles_pkey" PRIMARY KEY ("id_role")
);

-- CreateTable
CREATE TABLE "Roles_Users" (
    "id_role_user" SERIAL NOT NULL,
    "roleId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Roles_Users_pkey" PRIMARY KEY ("id_role_user")
);

-- CreateIndex
CREATE UNIQUE INDEX "Roles_Users_roleId_userId_key" ON "Roles_Users"("roleId", "userId");

-- AddForeignKey
ALTER TABLE "Bookmark" ADD CONSTRAINT "Bookmark_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Roles_Users" ADD CONSTRAINT "Roles_Users_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Roles"("id_role") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Roles_Users" ADD CONSTRAINT "Roles_Users_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id_user") ON DELETE CASCADE ON UPDATE CASCADE;
