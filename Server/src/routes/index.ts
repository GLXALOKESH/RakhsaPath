import { Router, Request, Response } from "express";
import HospitalRoutes from "../configs/routes/hospital.routes.js";
import hospitalRouter from "./hospital/index.js";

const mainRouter = Router();

mainRouter.get("/", (req: Request, res: Response): void => {
  res.send("API is running... Go to /hello/wellcome to see the wellcome message.");
});

mainRouter.use(HospitalRoutes.BASE_PATH, hospitalRouter)

export default mainRouter;

