import prismaClient from "../generated/prisma.client.js";
import ErrorInterface from "../interfaces/error.interface.js";
import CreateHospitalInterface from "../interfaces/hospital.interface.js";

class HospitalRepository {
  private prismaClient;

  constructor() {
    this.prismaClient = prismaClient;
  }

  async checkEmailExistsOnHospitalUser(email: string, includeHospitalUser: boolean = false) {
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
}

export default new HospitalRepository();
