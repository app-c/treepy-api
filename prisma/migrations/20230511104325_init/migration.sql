/*
  Warnings:

  - You are about to drop the `Orders_Message` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Orders_Message";

-- CreateTable
CREATE TABLE "WebHooks" (
    "id" TEXT NOT NULL,
    "message" JSONB NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WebHooks_pkey" PRIMARY KEY ("id")
);
