-- DropIndex
DROP INDEX "User_midle_name_key";

-- CreateTable
CREATE TABLE "user_tokens" (
    "id" TEXT NOT NULL,
    "token" UUID NOT NULL,
    "user_id" UUID,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_tokens_pkey" PRIMARY KEY ("id")
);
