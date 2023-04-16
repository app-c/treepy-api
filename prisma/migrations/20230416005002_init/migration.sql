-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "phone_area" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "End" (
    "id" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "locality" TEXT NOT NULL,
    "number_home" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "region_code" TEXT NOT NULL,
    "postal_code" TEXT NOT NULL,
    "fk_user_id" TEXT NOT NULL,

    CONSTRAINT "End_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profile" (
    "id" TEXT NOT NULL,
    "avatar" TEXT,
    "fk_user_id" TEXT NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User_tokens" (
    "id" TEXT NOT NULL,
    "token" UUID NOT NULL,
    "user_id" TEXT,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Charges" (
    "id" TEXT NOT NULL,
    "reference_id" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "charge_id" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "payment_method" TEXT NOT NULL,
    "fk_user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Charges_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sumary" (
    "id" TEXT NOT NULL,
    "total" INTEGER NOT NULL,
    "paid" INTEGER NOT NULL,
    "fk_charge_id" TEXT NOT NULL,

    CONSTRAINT "Sumary_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Orders_Message" (
    "id" TEXT NOT NULL,
    "message" JSONB NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Orders_Message_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_cpf_key" ON "User"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "End_fk_user_id_key" ON "End"("fk_user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_fk_user_id_key" ON "Profile"("fk_user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Sumary_fk_charge_id_key" ON "Sumary"("fk_charge_id");

-- AddForeignKey
ALTER TABLE "End" ADD CONSTRAINT "End_fk_user_id_fkey" FOREIGN KEY ("fk_user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_fk_user_id_fkey" FOREIGN KEY ("fk_user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Charges" ADD CONSTRAINT "Charges_fk_user_id_fkey" FOREIGN KEY ("fk_user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sumary" ADD CONSTRAINT "Sumary_fk_charge_id_fkey" FOREIGN KEY ("fk_charge_id") REFERENCES "Charges"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
