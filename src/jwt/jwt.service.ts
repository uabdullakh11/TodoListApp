import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Token } from "../token/entity/token.entity";

@Injectable()
export class JwtTokenService {
  constructor(private jwtService: JwtService) {}
  async generateAccessToken(id: string) {
    const payload = { id, type: "ACCESS" };
    const token = this.jwtService.sign(payload, {
      secret: process.env.PRIVATE_KEY || "SECRET",
      expiresIn: "30m",
    });
    return token;
  }

  async generateRefreshToken(id: string) {
    const payload = { id, type: "REFRESH_TOKEN" };
    const token = this.jwtService.sign(payload, {
      secret: process.env.PRIVATE_KEY_REFRESH || "SECRET2",
      expiresIn: "1d",
    });
    return token;
  }

  async verifyToken(token: string, key: string) {
    try {
      return this.jwtService.verify(token, {
        secret: key,
      });
    } catch (err) {
      throw new UnauthorizedException(
        "Unauthorized! Access Token was expired!"
      );
    }
  }

  async verifyTokenExpiration(token: Token) {
    return (
      token.expiryDate.getTime() <=
      Math.floor(new Date().getTime() / 1000) - 86400
    );
  }
}
