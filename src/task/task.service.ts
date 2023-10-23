import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { Task } from "./entity/task.entity";


@Injectable()
export class TaskService {
  constructor(@InjectModel(Task) private taskReposiroty: typeof Task) {}

  async getTasks(userId: string, { filter, page, search }) {
    const pageSize = 10;
    filter.where.userId = userId;
    const tasks = await this.taskReposiroty.findAll({
      where: !search
        ? filter.where
        : {
            userId,
            title: {
              [Op.iLike]: `%${search}%`,
            },
          },
      order: filter.order,
      offset: pageSize * (page - 1),
      limit: pageSize,
    });
    return tasks;
  }

  async createTask(dto: CreateTaskDto, userId: string) {
    const IsTask = await this.taskReposiroty.findOne({
      where: { title: dto.title, userId },
    });
    if (IsTask)
      throw new BadRequestException("Task with this title already exist!");
    const task = await this.taskReposiroty.create({
      ...dto,
      userId: userId
    });
    return task;
  }

  async deleteTask(id: string, userId: string) {
    await this.taskReposiroty.destroy({
      where: {
        id,
        userId,
      },
    });
  }

  async updateTask(id: string, dto: UpdateTaskDto, userId: string) {
    const taskToCheck = await this.taskReposiroty.findOne({
      where: {
        title: dto.title,
        id: {
          [Op.not]: id,
        },
        userId,
      },
    });

    if (taskToCheck)
      throw new BadRequestException("Task with this title already exist!");
    await this.taskReposiroty.update(
      {
        title: dto.title,
        date: dto.date,
        completed: dto.completed,
      },
      {
        where: {
          id,
          userId,
        },
      }
    );
  }
}
