/*
  Warnings:

  - You are about to drop the column `userLocation` on the `EmergencyBedBooking` table. All the data in the column will be lost.
  - Added the required column `latitude` to the `EmergencyBedBooking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitude` to the `EmergencyBedBooking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "EmergencyBedBooking" DROP COLUMN "userLocation",
ADD COLUMN     "latitude" DECIMAL(9,6) NOT NULL,
ADD COLUMN     "longitude" DECIMAL(9,6) NOT NULL;

-- CreateIndex
CREATE INDEX "EmergencyBedBooking_latitude_longitude_idx" ON "EmergencyBedBooking"("latitude", "longitude");
