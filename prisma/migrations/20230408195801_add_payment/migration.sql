/*
  Warnings:

  - You are about to drop the column `bairro` on the `End` table. All the data in the column will be lost.
  - You are about to drop the column `cep` on the `End` table. All the data in the column will be lost.
  - Added the required column `locality` to the `End` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postal_code` to the `End` table without a default value. This is not possible if the table is not empty.
  - Added the required column `region_code` to the `End` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "End" DROP COLUMN "bairro",
DROP COLUMN "cep",
ADD COLUMN     "locality" TEXT NOT NULL,
ADD COLUMN     "postal_code" TEXT NOT NULL,
ADD COLUMN     "region_code" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Payment" (
    "id" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "fk_user_id" TEXT NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_fk_user_id_fkey" FOREIGN KEY ("fk_user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
