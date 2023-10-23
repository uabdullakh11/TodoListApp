import { IsString, IsNotEmpty, Length, IsEmail } from 'class-validator';

export class UpdateUserDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 20, {message: 'Not lower than 3 and more than 20'})
  readonly login: string;
  @IsNotEmpty()
  @IsString()
  @IsEmail({}, {message: "Invalid email"})
  readonly  email: string;
}
