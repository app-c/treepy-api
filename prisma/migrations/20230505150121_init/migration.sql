/*
  Warnings:

  - A unique constraint covering the columns `[token]` on the table `User_tokens` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "User_tokens_token_key" ON "User_tokens"("token");
