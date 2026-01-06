import { IsNumber } from "class-validator";
import { Type } from "class-transformer";

export class CheckNearbyHospitalsDTO {
  @Type(() => Number)
  @IsNumber({}, { message: "Latitude must be a number" })
  lat!: number;

  @Type(() => Number)
  @IsNumber({}, { message: "Longitude must be a number" })
  lng!: number;
}
