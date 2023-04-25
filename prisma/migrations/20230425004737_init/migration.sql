/*
  Warnings:

  - You are about to drop the column `number_home` on the `End` table. All the data in the column will be lost.
  - Added the required column `home_number` to the `End` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "End" DROP COLUMN "number_home",
ADD COLUMN     "home_number" TEXT NOT NULL;
