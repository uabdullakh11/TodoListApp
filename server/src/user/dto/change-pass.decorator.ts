// import { IsString, IsNotEmpty, Length } from "class-validator";

export class ChangePassDto {
  // @IsNotEmpty({ message: "Исходный пароль не должен быть пустым" })
  // @IsString({ message: "Исходный пароль должен быть строкой" })
  // @Length(6, 22, {
  //   message: "Исходный пароль должен быть больше 6 или меньше 22 символов",
  // })
  readonly currentPassword: string;
  // @IsNotEmpty({ message: "Новый пароль не должен быть пустым" })
  // @IsString({ message: "Новый пароль должен быть строкой" })
  // @Length(6, 22, {
  //   message: "Новый парль должен быть больше 6 или меньше 22 символов",
  // })
  readonly newPassword: string;
}
