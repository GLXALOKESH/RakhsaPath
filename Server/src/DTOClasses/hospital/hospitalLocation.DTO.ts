import { IsNumber } from "class-validator";

export default class HospitalLocationDTO {
  @IsNumber({}, { message: "Hospital location longitude must be a number" })
  longitude!: number;

  @IsNumber({}, { message: "Hospital location latitude must be a number" })
  latitude!: number;
}
