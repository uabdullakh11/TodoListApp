import { IsString, IsNotEmpty, Length, IsEmail } from 'class-validator';

export class UpdateUserDto {
  @IsNotEmpty({message: "Логин не должен быть пустым"})
  @IsString({message: "Логин должен быть строкой"})
  @Length(3, 20, {
    message: "Логин должен быть больше трех или меньше 20 символов",
  })
  readonly login: string;
  @IsNotEmpty({message: "email не должен быть пустым"})
  @IsString({message: "email должен быть строкой"})
  @IsEmail({}, { message: "Некорректный email" })
  readonly  email: string;
}
