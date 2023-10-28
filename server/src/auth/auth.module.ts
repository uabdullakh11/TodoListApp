import { Module, forwardRef } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UserModule } from "../user/user.module";
import { JwtModule } from "@nestjs/jwt";
import { JwtCustomModule } from "jwt/jwt.module";
import { TokenModule } from "token/token.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "user/entity/user.entity";

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    forwardRef(() => UserModule),
    JwtCustomModule,
    TokenModule,
    JwtModule.register({}),
    TypeOrmModule.forFeature([User])
  ],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
