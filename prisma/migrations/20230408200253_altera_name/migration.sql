/*
  Warnings:

  - You are about to drop the column `midle_name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - Added the required column `full_name` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "midle_name",
DROP COLUMN "name",
ADD COLUMN     "full_name" TEXT NOT NULL;
