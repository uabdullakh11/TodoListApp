import { Module, forwardRef } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UserModule } from "../user/user.module";
import { JwtModule } from "@nestjs/jwt";
import { JwtTokenService } from "../jwt/jwt.service";
import { TokenService } from "../token/token.service";

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    forwardRef(() => UserModule),
    JwtTokenService,
    TokenService,
    JwtModule.register({}),
  ],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
