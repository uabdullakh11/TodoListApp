import { Module, forwardRef } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserModule } from 'user/user.module';
import { JwtCustomModule } from 'jwt/jwt.module';
import { User } from 'user/entity/user.entity';
import { Task } from './entity/task.entity';

@Module({
  controllers: [TaskController],
  providers: [TaskService],
  imports: [
    forwardRef(()=>JwtCustomModule),
    forwardRef(()=>UserModule),
    TypeOrmModule.forFeature([Task, User])],
})
export class TaskModule {}
