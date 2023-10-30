// import { PipeTransform, BadRequestException } from '@nestjs/common';

// import { CreateUserDto } from '../../dto/create-user.dto';

// import { UserSchema } from '../schemas/user.schema';

// export class CreateUserValidatorPipe implements PipeTransform<CreateUserDto> {
//   public transform(value: CreateUserDto): CreateUserDto {
//     const result = UserSchema.validate(value);
//     if (result.error) {
//       const errorMessages = result.error.details.map((d) => d.message).join();
//       throw new BadRequestException(errorMessages);
//     }
//     return value;
//   }
// }

// import { PipeTransform, BadRequestException } from '@nestjs/common';
// import { CreateTaskDto } from '../../dto/create-task.dto';
// import { TaskSchema } from '../schemas/task.create.schema';

// export class CreateTaskValidatorPipe implements PipeTransform<CreateTaskDto> {
//   public transform(value: CreateTaskDto): CreateTaskDto {
//     const result = TaskSchema.validate(value);
//     console.log(result)
//     if (result.error) {
//       console.log(result.error)
//       const errorMessages = result.error.details.map((d) => d.message).join();
//       throw new BadRequestException(errorMessages);
//     }
//     return value;
//   }
// }
// JoiValidationPipe.ts

import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from "@nestjs/common";
import * as Joi from "joi";

@Injectable()
export class ValidatorPipe implements PipeTransform {
  constructor(private readonly schema: Joi.Schema) {}

  // value is the value passed in, and related types of Body Query can be extracted from the metadata
  transform(value: any, metadata: ArgumentMetadata) {
    const { error } = this.schema.validate(value);
    if (metadata.type=='custom'){
      return value
    }
    if (error) {
      const errorMessages = error.details.map((d) => d.message.replace(/\"/g, "")).join();
      throw new BadRequestException(errorMessages);
    }
    return value;
  }
}
