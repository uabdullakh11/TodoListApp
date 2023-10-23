import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 20, {message: 'Login must be more than 3 and less than 20 characters'})
  readonly login: string;
  @IsNotEmpty()
  @IsString()
  @IsEmail({}, {message: "Invalid email"})
  readonly  email: string;
  @IsNotEmpty()
  @IsString()
  @Length(6, 22, {message: 'Password must be more than 6 and less than 22 characters'})
  readonly password: string;
}
