import { Module } from '@nestjs/common';
import { JwtTokenService } from './jwt.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[JwtModule.register({})],
  providers: [JwtTokenService],
  exports: [JwtTokenService, JwtModule]
})
export class JwtCustomModule {}
