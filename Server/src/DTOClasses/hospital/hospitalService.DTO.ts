import { ArrayNotEmpty, IsArray, IsInt, Min } from "class-validator";

export default class HospitalServiceDTO {
  @IsArray()
  @ArrayNotEmpty({ message: "Hospital services are required" })
  services!: string[];

  @IsArray()
  @ArrayNotEmpty({ message: "Hospital facilities are required" })
  facilities!: string[];

  @IsInt()
  @Min(0)
  emergencyBeds!: number;

  @IsInt()
  @Min(0)
  totalBeds!: number;

  @IsInt()
  @Min(0)
  availableBeds!: number;
}
