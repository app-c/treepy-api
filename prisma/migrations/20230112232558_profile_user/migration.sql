/*
  Warnings:

  - A unique constraint covering the columns `[fk_user_id]` on the table `Profile` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `fk_user_id` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "fk_user_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Profile_fk_user_id_key" ON "Profile"("fk_user_id");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_fk_user_id_fkey" FOREIGN KEY ("fk_user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
