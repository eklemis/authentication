/*
  Warnings:

  - You are about to drop the `RegisteredUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "RegisteredUser" DROP CONSTRAINT "RegisteredUser_userId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "bio" TEXT,
ADD COLUMN     "password" TEXT,
ADD COLUMN     "phone" TEXT;

-- DropTable
DROP TABLE "RegisteredUser";
