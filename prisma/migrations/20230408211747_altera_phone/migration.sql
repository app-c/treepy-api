/*
  Warnings:

  - You are about to drop the column `phone_are` on the `User` table. All the data in the column will be lost.
  - Added the required column `phone_area` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "phone_are",
ADD COLUMN     "phone_area" TEXT NOT NULL;
