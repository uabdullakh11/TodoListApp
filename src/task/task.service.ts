import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { Task } from "./entity/task.entity";
import { Like, Not, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "user/entity/user.entity";

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task) private taskReposiroty: Repository<Task>,
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  async getTasks(userId: string, { filter, page, search }) {
    const pageSize = 10;
    filter.where.userId = userId;
    const tasks = await this.taskReposiroty.findAndCount({
      where: !search
        ? filter.where
        : {
            userId,
            title: Like(`%${search}%`),
          },
      order: filter.order,
      skip: pageSize * (page - 1),
      take: pageSize,
    });
    return tasks;
  }

  async createTask(dto: CreateTaskDto, userId: string) {
    const user = await this.usersRepository.findOneBy({ id: userId });
    const IsTask = await this.taskReposiroty.findOne({
      where: { title: dto.title, user },
    });
    if (IsTask)
      throw new BadRequestException("Task with this title already exist!");
    const task = await this.taskReposiroty.create({
      ...dto,
      user,
    });
    return task;
  }

  async deleteTask(id: string, userId: string) {
    const user = await this.usersRepository.findOneBy({ id: userId });
    const findTask = await this.taskReposiroty.findOne({
      where: {
        id,
        user,
      },
    });
    if (!findTask)
      throw new BadRequestException("Task with this id doesn't exist");
    await this.taskReposiroty.remove(findTask);
  }

  async updateTask(id: string, dto: UpdateTaskDto, userId: string) {
    const user = await this.usersRepository.findOneBy({ id: userId });
    const taskToCheck = await this.taskReposiroty.findOne({
      where: {
        title: dto.title,
        id: Not(id),
        user,
      },
    });

    if (taskToCheck)
      throw new BadRequestException("Task with this title already exist!");

    await this.taskReposiroty.update(
      { id, user },
      { title: dto.title, date: dto.date, completed: dto.completed }
    );
    // await this.taskReposiroty.update(
    //   {
    //     title: dto.title,
    //     date: dto.date,
    //     completed: dto.completed,
    //   },
    //   {
    //     where: {
    //       id,
    //       userId,
    //     },
    //   }
    // );
  }
}
