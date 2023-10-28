import { Module, forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './entity/user.entity';
import { AuthModule } from '../auth/auth.module';
import { FilesModule } from '../files/files.module';
import { JwtCustomModule } from 'jwt/jwt.module';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [
    forwardRef(()=>AuthModule),
    JwtCustomModule,
    TypeOrmModule.forFeature([User]),
    FilesModule
  ],
  exports:[UserService]
})
export class UserModule {}
