import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class CreateUserDto {
  @IsNotEmpty({message: "Логин не должен быть пустым"})
  @IsString({message: "Логин должен быть строкой"})
  @Length(3, 20, {
    message: "Логин должен быть больше трех или меньше 20 символов",
  })
  readonly login: string;
  @IsNotEmpty({message: "email не должен быть пустым"})
  @IsString({message: "email должен быть строкой"})
  @IsEmail({}, { message: "Некорректный email" })
  readonly email: string;
  @IsNotEmpty({message: "Пароль не должен быть пустым"})
  @IsString({message: "Пароль должен быть строкой"})
  @Length(6, 22, {
    message: "Пароль должен быть больше 6 или меньше 22 символов",
  })
  readonly password: string;
}
