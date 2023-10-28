import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { JwtCustomModule } from 'jwt/jwt.module';
// import { Repository } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Token } from './entity/token.entity';
import { User } from 'user/entity/user.entity';

@Module({
  imports:[JwtCustomModule,TypeOrmModule.forFeature([Token, User])],
  providers: [TokenService],
  exports: [TokenService]
})
export class TokenModule {}
