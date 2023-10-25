import { Module } from "@nestjs/common";
import { TaskModule } from "./task/task.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FilesModule } from "./files/files.module";
import { ServeStaticModule } from "@nestjs/serve-static";
import { TokenModule } from "./token/token.module";
import { JwtModule } from "./jwt/jwt.module";
import * as path from "path";

@Module({
  imports: [
    TaskModule,
    // ConfigModule.forRoot({
    //   envFilePath: `.env`,
    // }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, "static"),
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
        entities: [__dirname + "/**/*.entity{.js,.ts}"],
        autoLoadEntities: true,
        synchronize: false,
      }),
      inject: [ConfigService],
    }),
    UserModule,
    AuthModule,
    FilesModule,
    TokenModule,
    JwtModule,
  ],
})
export class AppModule {}
