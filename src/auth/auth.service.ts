import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateUserDto } from "src/user/dto/create-user.dto";
import { LoginDto } from "./dto/login-dto";
import { LogOutDto } from "./dto/logout-dto";
import { RefreshTokenrDto } from "./dto/refreshtoken-dto";
import { UserService } from "src/user/user.service";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcryptjs";
import { User } from "src/user/user.model";
import { Op } from "sequelize";

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jswtService: JwtService
  ) {}
  async login(dto: LoginDto) {
    const user = await this.getUser(dto);
    return this.generateToken(user);
  }

  async register(dto: CreateUserDto) {
    const hashPassword = await bcrypt.hash(dto.password, 5);
    const user = await this.userService.createUser({
      ...dto,
      password: hashPassword,
    });
    return this.generateToken(user);
  }

  async logout(dto: LogOutDto) {}

  async refreshToken(dto: RefreshTokenrDto) {}

  private async generateToken(user: User) {
    const payload = { id: user.id };

    return {
      token: this.jswtService.sign(payload),
    };
  }

  private async getUser(dto: LoginDto) {
    const user = await User.findOne({
      where: {
        [Op.or]: [
          {
            email: dto.login,
          },
          {
            login: dto.login,
          },
        ],
      },
    });
    if (!user) throw new BadRequestException("User not found!");
    if (!(await bcrypt.compare(dto.password, user.password)))
      throw new BadRequestException("Invalid login or password!");
    return user
  }
}
