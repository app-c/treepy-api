-- DropForeignKey
ALTER TABLE "End" DROP CONSTRAINT "End_fk_user_id_fkey";

-- CreateTable
CREATE TABLE "Profile" (
    "id" TEXT NOT NULL,
    "avatar" TEXT,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "End" ADD CONSTRAINT "End_fk_user_id_fkey" FOREIGN KEY ("fk_user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- RenameIndex
ALTER INDEX "End.bairro_unique" RENAME TO "End_bairro_key";

-- RenameIndex
ALTER INDEX "End.fk_user_id_unique" RENAME TO "End_fk_user_id_key";

-- RenameIndex
ALTER INDEX "User.midle_name_unique" RENAME TO "User_midle_name_key";
