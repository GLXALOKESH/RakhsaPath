import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";

export const validateDto = (DTOClass: any, source: "body" | "query" | "params" = "body") => {
  return async (req: Request, _res: Response, next: NextFunction) => {
    try {
      if (!req[source]) {
        return next({
          statusCode: 400,
          message: "Request body is required",
        });
      }

      const dtoObj = plainToInstance(DTOClass, req[source], {
        enableImplicitConversion: true,
      });

      const errors = await validate(dtoObj, {
        whitelist: true,
        forbidNonWhitelisted: true,
        forbidUnknownValues: false,
      });

      if (errors.length > 0) {
        return next(errors);
      }

      if (source === "query") {
        (req as any).queryData = dtoObj;
      } else {
        req[source] = dtoObj;
      }
      next();
    } catch (err) {
      next(err);
    }
  };
};
