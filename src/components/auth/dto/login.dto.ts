import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginDto {
    @IsString()
    @IsNotEmpty()
    public readonly password: string;

    @IsEmail()
    public readonly email: string;
}