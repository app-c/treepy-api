/*
  Warnings:

  - You are about to drop the `user_tokens` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "user_tokens";

-- CreateTable
CREATE TABLE "User_tokens" (
    "id" TEXT NOT NULL,
    "token" UUID NOT NULL,
    "user_id" TEXT,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_tokens_pkey" PRIMARY KEY ("id")
);
