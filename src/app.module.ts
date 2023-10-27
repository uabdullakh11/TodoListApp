import { Module } from "@nestjs/common";
import { TaskModule } from "./task/task.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FilesModule } from "./files/files.module";
import { ServeStaticModule } from "@nestjs/serve-static";
import { TokenModule } from "./token/token.module";
import { JwtCustomModule } from "./jwt/jwt.module";
import * as path from "path";
import { Task } from "task/entity/task.entity";
import { User } from "user/entity/user.entity";
import { Token } from "token/entity/token.entity";

@Module({
  imports: [
    TaskModule,
    // ConfigModule.forRoot({
    //   envFilePath: `.env`,
    // }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ServeStaticModule.forRootAsync({
      useFactory: () => {
        return [
          {
            rootPath: path.join("src", 'static'),
            serveRoot: '/static/',
          },
        ];
      },
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: "postgres",
        host: configService.get("POSTGRES_HOST"),
        port: configService.get<number>("POSTGRES_PORT"),
        username: configService.get("POSTGRES_USERNAME"),
        password: configService.get("POSTGRES_PASS"),
        database: configService.get("POSTGRES_DB"),
        // entities: [path.join('src/**/entity/', '*.entity.{ts,js}')],
        entities: [Task, Token, User],
        autoLoadEntities: true,
        synchronize: false,
      }),
      inject: [ConfigService],
    }),
    UserModule,
    AuthModule,
    FilesModule,
    TokenModule,
    JwtCustomModule,
  ],
})
export class AppModule {}
