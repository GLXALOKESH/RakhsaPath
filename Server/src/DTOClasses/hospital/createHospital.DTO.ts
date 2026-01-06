import {
  IsDefined,
  IsEmail,
  IsNotEmpty,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";
import HospitalLocationDTO from "./hospitalLocation.DTO.js";
import HospitalServiceDTO from "./hospitalService.DTO.js";
import HospitalUserDTO from "./hospitalUser.DTO.js";

export default class CreateHospitalDTO {
  @IsNotEmpty({ message: "Hospital name is required" })
  name!: string;

  @IsNotEmpty({ message: "Hospital contact number is required" })
  contactNumber!: string;

  @IsEmail({}, { message: "Hospital email must be valid" })
  contactEmail!: string;

  @IsNotEmpty({ message: "Hospital address is required" })
  address!: string;

  @IsDefined({ message: "Hospital location is required" })
  @ValidateNested()
  @Type(() => HospitalLocationDTO)
  location!: HospitalLocationDTO;

  @IsDefined({ message: "Hospital service is required" })
  @ValidateNested()
  @Type(() => HospitalServiceDTO)
  service!: HospitalServiceDTO;

  @IsDefined({ message: "Hospital user is required" })
  @ValidateNested()
  @Type(() => HospitalUserDTO)
  hospitalUser!: HospitalUserDTO;
}
