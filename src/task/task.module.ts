import { Module, forwardRef } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { Task } from './entity/task.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [TaskController],
  providers: [TaskService],
  imports: [
    forwardRef(()=>AuthModule),
    SequelizeModule.forFeature([Task])],
})
export class TaskModule {}
