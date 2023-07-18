import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class RegisterDto {
    @IsString()
    @IsNotEmpty()
    public readonly password: string;

    @IsEmail()
    public readonly email: string;

    @IsString()
    @IsNotEmpty()
    public readonly name: string;
}