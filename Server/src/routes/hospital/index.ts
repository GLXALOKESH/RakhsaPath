import { Router } from "express";
import HospitalRoutes from "../../configs/routes/hospital.routes.js";
import { validateDto } from "../../middlewares/validateDTOs.js";
import CreateHospitalDTO from "../../DTOClasses/hospital/createHospital.DTO.js";
import LoginHospitalDTO from "../../DTOClasses/hospital/loginHospital.DTO.js";
import HospitalController from "../../controllers/hospital/hospital.controller.js";

const hospitalRouter = Router();

hospitalRouter.post(
  HospitalRoutes.CREATE_HOSPITAL,
  validateDto(CreateHospitalDTO),
  HospitalController.createHospital
);

hospitalRouter.post(
  HospitalRoutes.LOGIN_HOSPITAL,
  validateDto(LoginHospitalDTO),
  HospitalController.loginHospital
);

// hospitalRouter.get(HospitalRoutes.GET_NEARBY_HOSPITALS);

export default hospitalRouter;
