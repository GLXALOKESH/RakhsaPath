/*
  Warnings:

  - You are about to drop the `hospital` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `hospital_location` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `hospital_service` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "hospital_location" DROP CONSTRAINT "hospital_location_hospitalId_fkey";

-- DropForeignKey
ALTER TABLE "hospital_service" DROP CONSTRAINT "hospital_service_hospitalId_fkey";

-- DropTable
DROP TABLE "hospital";

-- DropTable
DROP TABLE "hospital_location";

-- DropTable
DROP TABLE "hospital_service";

-- CreateTable
CREATE TABLE "HospitalUser" (
    "id" TEXT NOT NULL,
    "hospitalId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "refreshToken" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HospitalUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Hospital" (
    "id" VARCHAR(255) NOT NULL,
    "name" VARCHAR(80) NOT NULL,
    "contactNumber" VARCHAR(15) NOT NULL,
    "contactEmail" VARCHAR(120) NOT NULL,
    "address" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Hospital_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HospitalLocation" (
    "hospitalId" VARCHAR(255) NOT NULL,
    "latitude" DECIMAL(9,6) NOT NULL,
    "longitude" DECIMAL(9,6) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HospitalLocation_pkey" PRIMARY KEY ("hospitalId")
);

-- CreateTable
CREATE TABLE "HospitalService" (
    "id" VARCHAR(255) NOT NULL,
    "hospitalId" VARCHAR(255) NOT NULL,
    "services" VARCHAR(120)[],
    "facilities" VARCHAR(120)[],
    "emergencyBeds" INTEGER NOT NULL DEFAULT 0,
    "totalBeds" INTEGER NOT NULL DEFAULT 0,
    "availableBeds" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HospitalService_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "HospitalUser_hospitalId_key" ON "HospitalUser"("hospitalId");

-- CreateIndex
CREATE UNIQUE INDEX "HospitalUser_email_key" ON "HospitalUser"("email");

-- CreateIndex
CREATE INDEX "HospitalUser_hospitalId_email_idx" ON "HospitalUser"("hospitalId", "email");

-- CreateIndex
CREATE INDEX "Hospital_name_id_idx" ON "Hospital"("name", "id");

-- CreateIndex
CREATE INDEX "HospitalLocation_hospitalId_idx" ON "HospitalLocation"("hospitalId");

-- CreateIndex
CREATE UNIQUE INDEX "HospitalService_hospitalId_key" ON "HospitalService"("hospitalId");

-- CreateIndex
CREATE INDEX "HospitalService_hospitalId_idx" ON "HospitalService"("hospitalId");

-- AddForeignKey
ALTER TABLE "HospitalUser" ADD CONSTRAINT "HospitalUser_hospitalId_fkey" FOREIGN KEY ("hospitalId") REFERENCES "Hospital"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HospitalLocation" ADD CONSTRAINT "HospitalLocation_hospitalId_fkey" FOREIGN KEY ("hospitalId") REFERENCES "Hospital"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HospitalService" ADD CONSTRAINT "HospitalService_hospitalId_fkey" FOREIGN KEY ("hospitalId") REFERENCES "Hospital"("id") ON DELETE CASCADE ON UPDATE CASCADE;
