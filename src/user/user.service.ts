import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./user.model";
import { InjectModel } from "@nestjs/sequelize";
import { Op } from "sequelize";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private userRepository: typeof User) {}

  async createUser(dto: CreateUserDto) {
    const isUser = await this.userRepository.findOne({
      where: { [Op.or]: { login: dto.login, email: dto.email } },
    });
    if (isUser) throw new BadRequestException("User already exist")

    const user = await this.userRepository.create(dto);
    return user;

  }
  async createAvatar(id: string) {
    throw new Error('Method not implemented.');
  }
  async changeData(dto: UpdateUserDto, id: string) {
    const userCheck = await  this.userRepository.findOne({
      where: {
        [Op.or]: [{ login: dto.login }, { email: dto.email }],
        id: {
          [Op.not]: id,
        },
      },
    });

    if (userCheck)
      throw new BadRequestException("User with this login or email already exist!");

    const user = await  this.userRepository.findByPk('');
    user.login = dto.login;
    user.email = dto.email;
    user.save();

    return { login: user.login, email: user.email };
  }
  async changePass(id: string) {
    throw new Error('Method not implemented.');
  }
  async delete(id: string) {
    await this.userRepository.destroy({
      where: {
        id,
      },
    });
  }
  async getStatistic(id: string) {
    throw new Error('Method not implemented.');
  }
  async getUser(id: string) {
    const userInfo = await this.userRepository.findAll({ 
      attributes: ['login', 'email','avatar'],
      where: {
        id,
      },
    });
    return userInfo;
  }
}
