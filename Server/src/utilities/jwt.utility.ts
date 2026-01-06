import jwt from "jsonwebtoken";
import { HospitalJwtSignAccessTokenPayloadInterface, HospitalJwtSignPayloadInterface } from "../interfaces/hospital.interface.js";
import ErrorInterface from "../interfaces/error.interface.js";

class JwtUtility {
  private jwtService;
  private JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "refresh_secret";
  private JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || "access_secret";

  constructor() {
    this.jwtService = jwt;
  }

  async createRefreshToken(payload: HospitalJwtSignPayloadInterface): Promise<string> {
    try {
      const signToken = await this.jwtService.sign(payload, this.JWT_REFRESH_SECRET);
      return signToken;
    } catch (error: any & ErrorInterface) {
      throw Error(error);
    }
  } 

  async createAccessToken(payload: HospitalJwtSignAccessTokenPayloadInterface): Promise<string> {
    try {
      const signToken = await this.jwtService.sign(payload, this.JWT_ACCESS_SECRET);
      return signToken;
    } catch (error: any & ErrorInterface) {
      throw Error(error);
    }
  }
}

export default JwtUtility;
