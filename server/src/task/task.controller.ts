import {
  Controller,
  Get,
  Post,
  Delete,
  Put,
  Body,
  Param,
  Query,
  ParseIntPipe,
  DefaultValuePipe,
  UseGuards,
  UsePipes,
} from "@nestjs/common";
import { TaskService } from "./task.service";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { TaskFilter } from "./decorator/task-filter.decorator";
import { UserId } from "./decorator/task-user-id.decorator";
import { JwtAuthGuard } from "../jwt/guards/jwt-auth.guard";
import { TaskCreateSchema } from "./validation/task.create.schema";
import { ValidatorPipe } from "pipes/validation.pipe";
import { TaskUpdateSchema } from "./validation/task.update.schema";

@Controller("api/todos")
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getTasks(
    @TaskFilter() filter: string,
    @Query("page", new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query("search") search: string,
    @UserId() userId: string
  ) {
    return this.taskService.getTasks(userId, {
      filter: filter,
      page: page,
      search: search,
    });
  }
  @Post()
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidatorPipe(TaskCreateSchema))
  async createTask(
    @Body() dto: CreateTaskDto,
    @UserId() userId: string
  ) {
    return this.taskService.createTask(dto, userId);
  }
  @Delete(":id")
  @UseGuards(JwtAuthGuard)
  async deleteTask(@Param("id") id: string, @UserId() userId: string) {
    return this.taskService.deleteTask(id, userId);
  }
  @Put(":id")
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidatorPipe(TaskUpdateSchema))
  async updateTask(
    @Param("id") id: string,
    @Body() dto: UpdateTaskDto,
    @UserId() userId: string
  ) {
    return this.taskService.updateTask(id, dto, userId);
  }
}
