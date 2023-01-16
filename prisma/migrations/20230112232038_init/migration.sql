-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "midle_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "End" (
    "id" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "bairro" TEXT NOT NULL,
    "number_home" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "fk_user_id" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User.midle_name_unique" ON "User"("midle_name");

-- CreateIndex
CREATE UNIQUE INDEX "End.bairro_unique" ON "End"("bairro");

-- CreateIndex
CREATE UNIQUE INDEX "End.fk_user_id_unique" ON "End"("fk_user_id");

-- AddForeignKey
ALTER TABLE "End" ADD FOREIGN KEY ("fk_user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
