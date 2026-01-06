import prismaClient from "../generated/prisma.client.js";
import ErrorInterface from "../interfaces/error.interface.js";
import CreateHospitalInterface, {
  CheckNearbyHospitalsInterface,
} from "../interfaces/hospital.interface.js";

class HospitalRepository {
  private prismaClient;

  constructor() {
    this.prismaClient = prismaClient;
  }

  async checkEmailExistsOnHospitalUser(
    email: string,
    includeHospitalUser: boolean = false
  ) {
    if (!email) return Error("Please provide an email, for registration.");

    return this.prismaClient.hospitalUser.findFirst({
      where: { email },
      include: {
        hospital: includeHospitalUser,
      },
    });
  }

  async createHospital(hospital: CreateHospitalInterface) {
    try {
      const result = await this.prismaClient.hospital.create({
        data: {
          name: hospital.name,
          contactNumber: hospital.contactNumber,
          contactEmail: hospital.contactEmail,
          address: hospital.address,
          location: {
            create: {
              latitude: hospital.location.latitude,
              longitude: hospital.location.longitude,
            },
          },
          hospitalService: {
            create: {
              services: hospital.service.services,
              facilities: hospital.service.facilities,
              emergencyBeds: hospital.service.emergencyBeds,
              totalBeds: hospital.service.totalBeds,
              availableBeds: hospital.service.availableBeds,
            },
          },
          hospitalUser: {
            create: {
              email: hospital.hospitalUser.email,
              password: hospital.hospitalUser.password,
              refreshToken: hospital.hospitalUser.refreshToken,
            },
          },
        },
        include: {
          hospitalUser: {
            select: {
              email: true,
            },
          },
        },
      });

      return result;
    } catch (error: any & ErrorInterface) {
      throw Error(error.message);
    }
  }

  async updateRefreshToken(id: string, refreshToken: string) {
    return this.prismaClient.hospitalUser.update({
      where: { id },
      data: { refreshToken },
    });
  }

  async checkNearbyHospitals(userData: CheckNearbyHospitalsInterface) {
    const { lat, lng, radius } = userData;

    return this.prismaClient.$queryRaw<
      Array<{
        hospitalId: string;
        name: string;
        address: string;
        contactNumber: string;
        contactEmail: string;
        latitude: number;
        longitude: number;
        distance: number;
      }>
    >`
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
          (
            6371 * acos(
              cos(radians(${Number(lat)}))
              * cos(radians(hl.latitude))
              * cos(radians(hl.longitude) - radians(${Number(lng)}))
              + sin(radians(${Number(lat)}))
              * sin(radians(hl.latitude))
            )
          ) AS distance
        FROM "HospitalLocation" hl
        JOIN "Hospital" h ON hl."hospitalId" = h.id
      ) AS sub
      WHERE distance <= ${Number(radius)}
      ORDER BY distance
      LIMIT 20;
    `;
  }
}

export default new HospitalRepository();
