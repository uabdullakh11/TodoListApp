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
} from "@nestjs/common";
import { TaskService } from "./task.service";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { Task, TaskFilter } from "./decorator/task.decorator";

@Controller("api/todos")
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getTasks(
    @TaskFilter() filter: string,
    @Query("page", new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query("search") search: string,
    @Task() userId: string,
  ) {
    console.log(filter)
    return this.taskService.getTasks(userId, {filter: filter, page: page, search: search});
  }
  @Post()
  @UseGuards(JwtAuthGuard)
  async createTask(@Body() dto: CreateTaskDto, @Task() userId: string) {
    return this.taskService.createTask(dto, userId);
  }
  @Delete(":id")
  @UseGuards(JwtAuthGuard)
  async deleteTask(@Param("id") id: string, @Task() userId: string) {
    return this.taskService.deleteTask(id, userId);
  }
  @Put(":id")
  @UseGuards(JwtAuthGuard)
  // @UsePipes(new ValidationPipe())
  async updateTask(
    @Param("id") id: string,
    @Body() dto: UpdateTaskDto,
    @Task() userId: string
  ) {
    return this.taskService.updateTask(id, dto, userId);
  }
}
