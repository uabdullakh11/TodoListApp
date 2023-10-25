import { Injectable } from "@nestjs/common";
import { User } from "../user/entity/user.entity";
import { JwtService } from "@nestjs/jwt";
import { Token } from "../token/entity/token.entity";

@Injectable()
export class JwtTokenService {
  constructor(private jwtService: JwtService) {}
  async generateAccessToken(user: User) {
    const payload = { id: user.id, type: "ACCESS" };
    const token = this.jwtService.sign(payload, {
      secret: process.env.PRIVATE_KEY || "SECRET",
      expiresIn: "30m",
    });
    return token;
  }

  async generateRefreshToken(user: User) {
    const payload = { id: user.id, type: "REFRESH_TOKEN" };
    const token = this.jwtService.sign(payload, {
      secret: process.env.PRIVATE_KEY_REFRESH || "SECRET2",
      expiresIn: "1d",
    });
    return token;
  }

  async verifyToken(token: string, key: string) {
    return this.jwtService.verify(token, {
      secret: key,
    });
  }

  async verifyTokenExpiration(token: Token) {
    return token.expiryDate.getTime() <= Math.floor(new Date().getTime() / 1000) - 86400;
  }
}
