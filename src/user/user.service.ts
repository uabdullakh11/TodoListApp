import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./entity/user.entity";
import { UpdateUserDto } from "./dto/update-user.dto";
import { FilesService } from "../files/files.service";
import { Not, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from "bcryptjs";
import { ChangePassDto } from "./dto/change-pass.decorator";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private fileService: FilesService
  ) {}

  async createUser(dto: CreateUserDto) {
    const isUser = await this.userRepository.findOne({
      where: [{ login: dto.login, email: dto.email }],
    });
    if (isUser) throw new BadRequestException("User already exist");

    const user = await this.userRepository.create(dto);
    return user;
  }
  async createAvatar(id: string, image: any) {
    const filename = await this.fileService.createFile(image);
    const avatarToCheck = await this.userRepository.findOne({
      where: { avatar: filename },
    });
    if (avatarToCheck) throw new BadRequestException(`Avatar already exist!`);
    const user = await this.userRepository.findOneBy({ id });
    user.avatar = filename;
    this.userRepository.save(user);
    return user.avatar;
  }
  async changeData(dto: UpdateUserDto, id: string) {
    const userCheck = await this.userRepository.findOne({
      where: [
        { login: dto.login, id: Not(id) },
        { email: dto.email, id: Not(id) },
      ],
    });

    if (userCheck)
      throw new BadRequestException(
        "User with this login or email already exist!"
      );

    const user = await this.userRepository.findOneBy({ id });
    user.login = dto.login;
    user.email = dto.email;
    this.userRepository.save(user);

    return { login: user.login, email: user.email };
  }
  async changePass(id: string, dto: ChangePassDto) {
    const user = await this.userRepository.findOneBy({ id });
    const isPasswordCorrect = await bcrypt.compare(
      dto.currentPassword,
      user.password
    );
    if (!isPasswordCorrect)
      throw new BadRequestException("Incorrect current password!");
    user.password = bcrypt.hash(dto.newPassword, 5);
    this.userRepository.save(user);
    return "Password changed successfully!";
  }

  async delete(id: string) {
    const findUser = await this.userRepository.findOneBy({ id });
    await this.userRepository.remove(findUser);
  }
  async getStatistic(id: string) {
    const {countAll, countDone} = await this.userRepository.query(
      `SELECT COUNT(*) AS AllTodos, (SELECT COUNT(*) AS DoneTodos FROM TASKS WHERE userId=${id}, completed=true) AS DoneTodos FROM TASKS WHERE userId=${id}`
    );
    const {countWeekAll, countWeekDone} = await this.userRepository.query(
      `SELECT COUNT(*) AS AllTodos, (SELECT COUNT(*) AS DoneTodos FROM TASKS WHERE userId=${id}, completed=true) AS DoneTodos FROM TASKS WHERE userId=${id}`
    );

    const AllTimePercant = Math.floor((countDone / countAll) * 100);
    const WeekPercant = Math.floor((countWeekDone / countWeekAll) * 100);
    return { AllTimePercant, WeekPercant };
  }
  async getUser(id: string) {
    const userInfo = await this.userRepository.find({
      select: ["login", "email", "avatar"],
      where: {
        id,
      },
    });
    return userInfo;
  }
}
