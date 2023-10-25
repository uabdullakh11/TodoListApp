import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateUserDto } from "../user/dto/create-user.dto";
import { LoginDto } from "./dto/login-dto";
import { LogOutDto } from "./dto/logout-dto";
import { RefreshTokenDto } from "./dto/refreshtoken-dto";
import { UserService } from "../user/user.service";
import * as bcrypt from "bcryptjs";
import { User } from "../user/entity/user.entity";
import { JwtTokenService } from "..//jwt/jwt.service";
import { TokenService } from "..//token/token.service";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtTokenService,
    private tokenService: TokenService,
    @InjectRepository(User) private userRepository: Repository<User>
  ) {}
  async login(dto: LoginDto) {
    const user = await this.getUser(dto);
    return this.jwtService.generateAccessToken(user);
  }

  async register(dto: CreateUserDto) {
    const hashPassword = await bcrypt.hash(dto.password, 5);
    const user = await this.userService.createUser({
      ...dto,
      password: hashPassword,
    });
    return this.jwtService.generateAccessToken(user);
  }

  async logout(dto: LogOutDto) {
    return await this.tokenService.deleteToken(dto.token);
  }

  async refreshToken(dto: RefreshTokenDto) {
    const TOKENS = await this.tokenService.updateToken(dto.token);
    const ACCESS_TOKEN = TOKENS.ACCESS_TOKEN;
    const REFRESH_TOKEN = TOKENS.REFRESH_TOKEN;
    return {
      ACCESS_TOKEN,
      REFRESH_TOKEN,
      expires_in: Math.floor(new Date().getTime() / 1000),
    };
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
