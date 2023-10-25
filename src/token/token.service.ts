import { BadRequestException, Injectable } from "@nestjs/common";
import { JwtTokenService } from "../jwt/jwt.service";
import { Token } from "./entity/token.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class TokenService {
  constructor(
    private jwtService: JwtTokenService,
    @InjectRepository(Token) private tokenRepository: Repository<Token>
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

  async updateToken(token: string) {
    const findToken = await this.tokenRepository.findOneBy({ token });
    if (!findToken) throw new BadRequestException("Invalid refresh token");
    const user = await this.jwtService.verifyToken(
      token,
      process.env.PRIVATE_KEY_REFRESH
    );
    if (!user) throw new BadRequestException("Invalid refresh token");

    if (this.jwtService.verifyTokenExpiration(findToken)) {
      //если истек срок refresh обновить в базе
      // const REFRESH_TOKEN = this.jwtService.generateRefreshToken(user);
      await this.tokenRepository.remove(findToken);
      // await this.tokenRepository.save({
      //   userId: user.id,
      //   token: REFRESH_TOKEN,
      // });
    }

    //создать refsresh_token и заменить в базе
    const REFRESH_TOKEN = await this.jwtService.generateRefreshToken(user);
    const ACCESS_TOKEN = await this.jwtService.generateAccessToken(user);

    await this.tokenRepository.remove(findToken);
    await this.tokenRepository.save({ userId: user.id, token: REFRESH_TOKEN });

    return { REFRESH_TOKEN, ACCESS_TOKEN };
  }
}
