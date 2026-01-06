import { IsNotEmpty } from "class-validator";
import BookEmergencySeatInterface from "../../interfaces/public.interface.js";

export default class BookEmergencySeatDTO implements BookEmergencySeatInterface{
  @IsNotEmpty({ message: "Name is required" })
  name!: string;

  @IsNotEmpty({ message: "Phone is required" })
  phone!: string;

  @IsNotEmpty({ message: "Latitude is required" })
  latitude!: string;

  @IsNotEmpty({ message: "Longitude is required" })
  longitude!: string;

  @IsNotEmpty({ message: "Type of emergency is required" })
  typeOfEmergency!: string;

  @IsNotEmpty({ message: "Hospital ID is required" })
  hospitalId!: string;
}
