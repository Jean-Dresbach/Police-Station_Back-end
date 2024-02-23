-- CreateTable
CREATE TABLE "crimes" (
    "id" UUID NOT NULL,
    "type" VARCHAR(100) NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "location" VARCHAR(255) NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "criminal_id" UUID NOT NULL,

    CONSTRAINT "crimes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Weapon" (
    "id" UUID NOT NULL,
    "type" VARCHAR(100) NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "origin" VARCHAR(255) NOT NULL,
    "condition" VARCHAR(100) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "crime_id" UUID NOT NULL,

    CONSTRAINT "Weapon_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "crimes_criminal_id_key" ON "crimes"("criminal_id");

-- CreateIndex
CREATE UNIQUE INDEX "Weapon_crime_id_key" ON "Weapon"("crime_id");

-- AddForeignKey
ALTER TABLE "crimes" ADD CONSTRAINT "crimes_criminal_id_fkey" FOREIGN KEY ("criminal_id") REFERENCES "criminals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Weapon" ADD CONSTRAINT "Weapon_crime_id_fkey" FOREIGN KEY ("crime_id") REFERENCES "crimes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
