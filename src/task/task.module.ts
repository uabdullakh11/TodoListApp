import { Module, forwardRef } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { Task } from './entity/task.entity';
import { TypeOrmModule } from '@nestjs/typeorm'
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'user/user.module';

@Module({
  controllers: [TaskController],
  providers: [TaskService],
  imports: [
    forwardRef(()=>JwtModule),
    forwardRef(()=>UserModule),
    TypeOrmModule.forFeature([Task])],
})
export class TaskModule {}
