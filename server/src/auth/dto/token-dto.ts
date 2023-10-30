// import { IsNotEmpty, IsString } from "class-validator";


export class TokenDto {
    // @IsNotEmpty({message: "Токен не должен быть пустым"})
    // @IsString({message: "Токен должны быть строкой"})
    readonly token: string;
} 