import ErrorInterface from "../../interfaces/error.interface.js";
import CreateHospitalInterface, {
  CheckNearbyHospitalsInterface,
  LoginHospitalInterface,
} from "../../interfaces/hospital.interface.js";
import HospitalRepository from "../../repositories/hospital.repo.js";
import JwtUtility from "../../utilities/jwt.utility.js";
import bcrypt from "bcrypt";

class HospitalService {
  private hospitalRepo;
  private jwtUtility;
  private nowTime: number;
  private bcryptSaltRounds: number;

  constructor() {
    this.hospitalRepo = HospitalRepository;
    this.jwtUtility = new JwtUtility();
    this.nowTime = Math.floor(Date.now() / 1000);
    this.bcryptSaltRounds = Number(process.env.BCRYPT_SALT_ROUNDS);
  }

  async createHospital(hospitalData: CreateHospitalInterface) {
    try {
      console.log("Hospital data received on hospital service", hospitalData);
      // check email is already exists or not for registration new hospital
      const checkEmailExists =
        await this.hospitalRepo.checkEmailExistsOnHospitalUser(
          hospitalData.hospitalUser.email
        );
      if (checkEmailExists) {
        throw Error("Email already exists");
      }
      // Generate one refresh token
      const refreshToken = await this.jwtUtility.createRefreshToken({
        name: hospitalData.name,
        email: hospitalData.hospitalUser.email,
        iss: "RakshaPath",
        iat: this.nowTime,
        exp: this.nowTime + 60 * 60 * 24 * 7,
      });

      const hashedPassword = await bcrypt.hash(
        hospitalData.hospitalUser.password,
        this.bcryptSaltRounds
      );

      // Create new Hospital
      const createHospital = await this.hospitalRepo.createHospital({
        ...hospitalData,
        hospitalUser: {
          ...hospitalData.hospitalUser,
          password: hashedPassword,
          refreshToken: refreshToken,
        },
      });

      //   Generate access token
      const accessToken = await this.jwtUtility.createAccessToken({
        name: hospitalData.name,
        hospitalId: createHospital.id,
        email: hospitalData.hospitalUser.email,
        iss: "RakshaPath",
        iat: this.nowTime,
        exp: this.nowTime + 60 * 60 * 24,
      });

      return {
        ...createHospital,
        hospitalUser: {
          ...createHospital.hospitalUser,
          accessToken: accessToken,
          refreshToken: refreshToken,
        },
      };
    } catch (error: any & ErrorInterface) {
      throw Error(error.message);
    }
  }

  async loginHospital(loginData: LoginHospitalInterface) {
    try {
      // Check if user exists
      const hospitalUser =
        await this.hospitalRepo.checkEmailExistsOnHospitalUser(
          loginData.email,
          true
        );
      if (hospitalUser instanceof Error || !hospitalUser) {
        throw Error("Invalid credentials");
      }

      // Check password
      const isPasswordValid = await bcrypt.compare(
        loginData.password,
        hospitalUser.password
      );
      if (!isPasswordValid) {
        throw Error("Invalid credentials");
      }

      // Generate tokens
      const refreshToken = await this.jwtUtility.createRefreshToken({
        name: hospitalUser.hospital.name,
        email: hospitalUser.email,
        iss: "RakshaPath",
        iat: this.nowTime,
        exp: this.nowTime + 60 * 60 * 24 * 7,
      });

      const accessToken = await this.jwtUtility.createAccessToken({
        name: hospitalUser.hospital.name,
        hospitalId: hospitalUser.hospitalId,
        email: hospitalUser.email,
        iss: "RakshaPath",
        iat: this.nowTime,
        exp: this.nowTime + 60 * 60 * 24,
      });

      await this.hospitalRepo.updateRefreshToken(hospitalUser.id, refreshToken);

      return {
        accessToken,
        refreshToken,
      };
    } catch (error: any & ErrorInterface) {
      throw Error(error.message);
    }
  }

  async checkNearbyHospitals(userData: CheckNearbyHospitalsInterface) {
    try {
      const hospitals = await this.hospitalRepo.checkNearbyHospitals({
        ...userData,
        radius: 30,
      });

      return {
        radiusUsed: 30,
        hospitals,
      };
    } catch (error: any & ErrorInterface) {
      throw Error(error.message);
    }
  }
}

export default HospitalService;
