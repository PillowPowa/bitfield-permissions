import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class PostDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(1024)
    public readonly text: string;
}