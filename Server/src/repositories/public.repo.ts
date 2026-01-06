import prismaClient from "../generated/prisma.client.js";
import { PrismaClient } from "../generated/prisma/client.js";
import ErrorInterface from "../interfaces/error.interface.js";
import BookEmergencySeatInterface from "../interfaces/public.interface.js";

export default class PublicRepo {
  private prismaClient: PrismaClient;

  constructor() {
    this.prismaClient = prismaClient;
  }

  async bookEmergencySeat(userData: BookEmergencySeatInterface) {
    try {
      return await this.prismaClient.emergencyBedBooking.create({
        data: {
          userName: userData.name,
          userPhone: userData.phone,
          latitude: userData.latitude,
          longitude: userData.longitude,
          typeOfEmergency: userData.typeOfEmergency,
          hospitalId: userData.hospitalId,
        },
      });
    } catch (error: any & ErrorInterface) {
      throw Error(error.message);
    }
  }
}
