import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateUserDto } from "../user/dto/create-user.dto";
import { LoginDto } from "./dto/login-dto";
import { LogOutDto } from "./dto/logout-dto";
import { RefreshTokenDto } from "./dto/refreshtoken-dto";
import { UserService } from "../user/user.service";
import * as bcrypt from "bcryptjs";
import { TokenService } from "..//token/token.service";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../user/entity/user.entity";

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private tokenService: TokenService,
    @InjectRepository(User) private userRepository: Repository<User>
  ) {}
  async login(dto: LoginDto) {
    const user = await this.getUser(dto);
    return await this.tokenService.createNewToken(user.id);
  }

  async register(dto: CreateUserDto) {
    const hashPassword = await bcrypt.hash(dto.password, 5);
    const user = await this.userService.createUser({
      ...dto,
      password: hashPassword,
    });
    return await this.tokenService.createNewToken(user.id);
  }

  async logout(dto: LogOutDto) {
    return await this.tokenService.deleteToken(dto.token);
  }

  async refreshToken(dto: RefreshTokenDto) {
    return await this.tokenService.refreshToken(dto.token);
  }

  private async getUser(dto: LoginDto) {
    const user = await this.userRepository.findOne({
      where: [
        {
          email: dto.login,
        },
        {
          login: dto.login,
        },
      ],
    });
    if (!user) throw new BadRequestException("User not found!");
    if (!(await bcrypt.compare(dto.password, user.password)))
      throw new BadRequestException("Invalid login or password!");
    return user;
  }
}
