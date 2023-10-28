import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { ILike, Not, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Task } from "./entity/task.entity";
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
    const user = await this.usersRepository.findOneBy({ id: userId });
    filter.where.user = user;
    const tasks = await this.taskReposiroty.find({
      where: !search
        ? filter.where
        : {
            user,
            title: ILike(`%${search}%`),
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
    const task = this.taskReposiroty.create({
      ...dto,
      completed: false,
      created_at: new Date(),
      user,
    });
    console.log(task)
    await this.taskReposiroty.save(task);
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
  }
}
