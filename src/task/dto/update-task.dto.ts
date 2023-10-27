import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateTaskDto {
  @IsNotEmpty({message: "Название не должно быть пустым"})
  @IsString({message: "Название должно быть строкой"})
  title: string;
  @IsNotEmpty({message: "Дата не должна быть пустым"})
  @IsString({message: "Дата должна быть строкой"})
  date: string;
  @IsNotEmpty({message: "Выполнено не должна быть пустым"})
  completed: boolean;
}
