import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { LoginHospitalInterface } from "../../interfaces/hospital.interface.js";

export default class LoginHospitalDTO implements LoginHospitalInterface {
  @IsEmail({},{message: "Please enter a valid email address"})
  @IsNotEmpty({message: "Email is required"})
  email!: string;

  @IsString()
  @IsNotEmpty({message: "Password is required"})
  password!: string;
}
