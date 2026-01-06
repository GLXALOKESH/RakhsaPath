import { Router } from "express";
import PublicRoutes from "../../configs/routes/public.routes.js";
import { validateDto } from "../../middlewares/validateDTOs.js";
import BookEmergencySeatDTO from "../../DTOClasses/public/bookEmergencySeat.DTO.js";
import PublicController from "../../controllers/public/public.controller.js";


const publicRouter =  Router();


publicRouter.post(PublicRoutes.BOOK_AN_EMERGENCY_SEAT, validateDto(BookEmergencySeatDTO), PublicController.bookEmergencySeat)


export default publicRouter;