import { BadRequestException, Injectable } from "@nestjs/common";
import { JwtTokenService } from "../jwt/jwt.service";
import { Token } from "./entity/token.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "user/entity/user.entity";

@Injectable()
export class TokenService {
  constructor(
    private jwtService: JwtTokenService,
    @InjectRepository(Token) private tokenRepository: Repository<Token>,
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}
  async deleteToken(token: string) {
    const findToken = await this.tokenRepository.findOneBy({ token });
    if (!findToken) throw new BadRequestException("Invalid refresh token");
    const user = this.jwtService.verifyToken(
      token,
      process.env.PRIVATE_KEY_REFRESH
    );
    if (!user) throw new BadRequestException("Invalid refresh token");
    //удалить токен в базе
    await this.tokenRepository.remove(findToken);

    return "Logout succesfully!";
  }

  async refreshToken(token: string) {
    const findToken = await this.tokenRepository.findOneBy({ token });
    if (!findToken) throw new BadRequestException("Invalid refresh token");
    const userId = await this.jwtService.verifyToken(
      token,
      process.env.PRIVATE_KEY_REFRESH
    );
    if (!userId) throw new BadRequestException("Invalid refresh token");

    if (await this.jwtService.verifyTokenExpiration(findToken)) {
      //если истек срок refresh обновить в базе
      await this.tokenRepository.remove(findToken);
    }

    //создать refsresh_token и заменить в базе
    const REFRESH_TOKEN = await this.jwtService.generateRefreshToken(userId.id);
    const ACCESS_TOKEN = await this.jwtService.generateAccessToken(userId.id);

    await this.tokenRepository.remove(findToken);

    const user = await this.usersRepository.findOneBy({ id: userId.id });
    const newToken = this.tokenRepository.create({
      token: REFRESH_TOKEN,
      expiryDate: new Date(),
      user,
    });

    await this.tokenRepository.save(newToken);

    return {
      REFRESH_TOKEN,
      ACCESS_TOKEN,
      expires_in: Math.floor(new Date().getTime() / 1000),
    };
  }

  async createNewToken(id: string) {
    const REFRESH_TOKEN = await this.jwtService.generateRefreshToken(id);
    const ACCESS_TOKEN = await this.jwtService.generateAccessToken(id);

    const user = await this.usersRepository.findOneBy({ id });
    const token = this.tokenRepository.create({
      token: REFRESH_TOKEN,
      expiryDate: new Date(),
      user,
    });
    await this.tokenRepository.save(token);

    return {
      REFRESH_TOKEN,
      ACCESS_TOKEN,
      expires_in: Math.floor(new Date().getTime() / 1000),
    };
  }
}
