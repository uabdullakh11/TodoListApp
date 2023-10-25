import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty({message: "Название не должно быть пустым"})
  @IsString({message: "Название должно быть строкой"})
  title: string;
  @IsNotEmpty({message: "Дата не должна быть пустым"})
  @IsString({message: "Дата должна быть строкой"})
  date: string;
}
