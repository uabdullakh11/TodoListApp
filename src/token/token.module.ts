import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { JwtTokenService } from '../jwt/jwt.service';

@Module({
  imports: [JwtTokenService],
  providers: [TokenService],
  exports: [TokenService]
})
export class TokenModule {}
