import { Router, Request, Response } from "express";
import HospitalRoutes from "../configs/routes/hospital.routes.js";
import hospitalRouter from "./hospital/index.js";
import PublicRoutes from "../configs/routes/public.routes.js";
import publicRouter from "./public/index.js";

const mainRouter = Router();

mainRouter.get("/", (req: Request, res: Response): void => {
  res.status(200).json({
    message: "API is running...",
  });
});

mainRouter.use(HospitalRoutes.BASE_PATH, hospitalRouter);
mainRouter.use(PublicRoutes.BASE_PATH, publicRouter);

export default mainRouter;
