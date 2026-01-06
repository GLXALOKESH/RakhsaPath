import { IsEmail, IsNotEmpty } from "class-validator";


export default class HospitalUserDTO {
    @IsEmail({},{message:"Hospital email must be valid"})
    email!: string;

    @IsNotEmpty({message:"Hospital password is required"})
    password!: string;
}