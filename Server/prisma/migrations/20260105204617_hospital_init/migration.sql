-- CreateTable
CREATE TABLE "hospital" (
    "id" VARCHAR(255) NOT NULL,
    "name" VARCHAR(80) NOT NULL,
    "contactNumber" VARCHAR(15) NOT NULL,
    "email" VARCHAR(120) NOT NULL,
    "address" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "hospital_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hospital_location" (
    "hospitalId" VARCHAR(255) NOT NULL,
    "latitude" DECIMAL(9,6) NOT NULL,
    "longitude" DECIMAL(9,6) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "hospital_location_pkey" PRIMARY KEY ("hospitalId")
);

-- CreateTable
CREATE TABLE "hospital_service" (
    "id" VARCHAR(255) NOT NULL,
    "hospitalId" VARCHAR(255) NOT NULL,
    "services" VARCHAR(120)[],
    "facilities" VARCHAR(120)[],
    "emergencyBeds" INTEGER NOT NULL DEFAULT 0,
    "totalBeds" INTEGER NOT NULL DEFAULT 0,
    "availableBeds" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "hospital_service_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "hospital_email_key" ON "hospital"("email");

-- CreateIndex
CREATE INDEX "hospital_name_id_idx" ON "hospital"("name", "id");

-- CreateIndex
CREATE INDEX "hospital_location_hospitalId_idx" ON "hospital_location"("hospitalId");

-- CreateIndex
CREATE UNIQUE INDEX "hospital_service_hospitalId_key" ON "hospital_service"("hospitalId");

-- CreateIndex
CREATE INDEX "hospital_service_hospitalId_idx" ON "hospital_service"("hospitalId");

-- AddForeignKey
ALTER TABLE "hospital_location" ADD CONSTRAINT "hospital_location_hospitalId_fkey" FOREIGN KEY ("hospitalId") REFERENCES "hospital"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hospital_service" ADD CONSTRAINT "hospital_service_hospitalId_fkey" FOREIGN KEY ("hospitalId") REFERENCES "hospital"("id") ON DELETE CASCADE ON UPDATE CASCADE;
