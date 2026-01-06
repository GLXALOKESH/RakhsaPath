import ErrorInterface from "../../interfaces/error.interface.js";
import { Request, Response } from "express";
import CreateHospitalInterface, {
  CheckNearbyHospitalsInterface,
  LoginHospitalInterface,
} from "../../interfaces/hospital.interface.js";
import HospitalService from "../../services/hospital/hospital.service.js";
import HttpResponseCode from "../../constants/httpResponseCode.js";
import hospitalResponseMapper from "../../mappers/hospital/hospitalCreatedResponse.mapper.js";
import hospitalLoginResponseMapper from "../../mappers/hospital/hospitalLoginResponse.mapper.js";
import ErrorResponseDTO from "../../DTOClasses/errorResponse.DTO.js";
import { ResponseDTO } from "../../DTOClasses/response.DTO.js";

class HospitalController {
  async createHospital(req: Request, res: Response) {
    try {
      const hospitalData = req.body as CreateHospitalInterface;

      const result = await new HospitalService().createHospital(hospitalData);

      const createdHospitalMappedResponse = hospitalResponseMapper({
        message: "Hospital created with thes details",
        data: {
          name: result.name,
          contactNumber: result.contactNumber,
          contactEmail: result.contactEmail,
          address: result.address,
          loginEmail: result.hospitalUser.email!,
          accessToken: result.hospitalUser.accessToken,
          refreshToken: result.hospitalUser.refreshToken,
        },
      });

      res.status(HttpResponseCode.OK).json(createdHospitalMappedResponse);
    } catch (error: any & ErrorInterface) {
      console.log(error.message);
      throw Error(error.message);
    }
  }

  async loginHospital(req: Request, res: Response) {
    try {
      const loginData = req.body as LoginHospitalInterface;
      const result = await new HospitalService().loginHospital(loginData);

      const loginMappedResponse = hospitalLoginResponseMapper(result);

      res.status(HttpResponseCode.OK).json(loginMappedResponse);
    } catch (error: any & ErrorInterface) {
      console.log(error.message);
      if (error.message === "Invalid credentials") {
        const errorRes = new ErrorResponseDTO(
          req.path,
          HttpResponseCode.UNAUTHORIZED,
          error.message
        );
        res.status(HttpResponseCode.UNAUTHORIZED).json(errorRes);
      } else {
        const errorRes = new ErrorResponseDTO(
          req.path,
          HttpResponseCode.INTERNAL_SERVER_ERROR,
          error.message
        );
        res.status(HttpResponseCode.INTERNAL_SERVER_ERROR).json(errorRes);
      }
    }
  }

  async checkNearbyHospitals(req: Request, res: Response) {
    try {
      const lat = Number(req.query.lat);
      const lng = Number(req.query.lng);

      const userData: CheckNearbyHospitalsInterface = {
        lat,
        lng,
        radius: 5000, // default radius
      };

      console.log("user location for nearby hospitals:", userData);

      const result = await new HospitalService().checkNearbyHospitals(userData);

      console.log("nearby hospital results:", result);

      const nearbyHospitalsResponse = new ResponseDTO();
      nearbyHospitalsResponse.setStatus(true);
      nearbyHospitalsResponse.setMessage("Nearby hospitals found");
      nearbyHospitalsResponse.setData(result);

      return res.status(HttpResponseCode.OK).json(nearbyHospitalsResponse);
    } catch (error: any) {
      console.error(error.message);
      return res.status(500).json({
        status: false,
        message: error.message,
      });
    }
  }
}

export default new HospitalController();
