/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `RegisteredUser` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "RegisteredUser" ADD COLUMN     "email" TEXT,
ADD COLUMN     "image" TEXT,
ADD COLUMN     "name" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "RegisteredUser_email_key" ON "RegisteredUser"("email");
