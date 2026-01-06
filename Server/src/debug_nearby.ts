import prismaClient from "./generated/prisma.client.js";

async function main() {
  console.log("Checking Hospital Locations...");
  try {
    const count = await prismaClient.hospitalLocation.count();
    console.log(`Total HospitalLocations: ${count}`);

    const locations = await prismaClient.hospitalLocation.findMany({ take: 5 });
    console.log("Found sample locations:", JSON.stringify(locations, null, 2));

    if (locations.length > 0) {
      const loc = locations[0];
      // Convert Decimal to number for the query
      const lat = Number(loc.latitude);
      const lng = Number(loc.longitude);

      console.log(`Testing with lat: ${lat}, lng: ${lng} (from first record)`);

      const radius = 30; // 30 km

      console.log("Running raw query...");

      const result = await prismaClient.$queryRaw`
        SELECT *
        FROM (
          SELECT
            hl."hospitalId",
            h.name,
            h.address,
            h."contactNumber",
            h."contactEmail",
            hl.latitude,
            hl.longitude,
            hs."totalBeds",
            hs."availableBeds",
            hs."emergencyBeds",
            (
              6371 * acos(
                cos(radians(${lat}))
                * cos(radians(hl.latitude))
                * cos(radians(hl.longitude) - radians(${lng}))
                + sin(radians(${lat}))
                * sin(radians(hl.latitude))
              )
            ) AS distance
          FROM "HospitalLocation" hl
          JOIN "Hospital" h ON hl."hospitalId" = h.id
          LEFT JOIN "HospitalService" hs ON h.id = hs."hospitalId"
        ) AS sub
        WHERE distance <= ${radius}
        ORDER BY distance
        LIMIT 20;
      `;

      console.log("Raw query result:", result);
    } else {
      console.log("No locations found in DB. Cannot test query.");
    }
  } catch (err) {
    console.error("Error:", err);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prismaClient.$disconnect();
  });
