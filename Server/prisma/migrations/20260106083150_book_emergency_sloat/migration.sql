-- DropIndex
DROP INDEX "Hospital_name_id_idx";

-- DropIndex
DROP INDEX "HospitalLocation_hospitalId_idx";

-- DropIndex
DROP INDEX "HospitalService_hospitalId_idx";

-- DropIndex
DROP INDEX "HospitalUser_hospitalId_email_idx";

-- AlterTable
ALTER TABLE "HospitalUser" ALTER COLUMN "refreshToken" DROP NOT NULL;

-- CreateTable
CREATE TABLE "EmergencyBedBooking" (
    "id" VARCHAR(255) NOT NULL,
    "hospitalId" VARCHAR(255) NOT NULL,
    "userName" VARCHAR(80) NOT NULL,
    "userPhone" VARCHAR(15) NOT NULL,
    "userLocation" DECIMAL(9,6)[],
    "typeOfEmergency" VARCHAR(80) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EmergencyBedBooking_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "EmergencyBedBooking_hospitalId_key" ON "EmergencyBedBooking"("hospitalId");

-- AddForeignKey
ALTER TABLE "EmergencyBedBooking" ADD CONSTRAINT "EmergencyBedBooking_hospitalId_fkey" FOREIGN KEY ("hospitalId") REFERENCES "Hospital"("id") ON DELETE CASCADE ON UPDATE CASCADE;
