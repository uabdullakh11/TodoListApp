import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';;

async function bootstrap() {
  const PORT = process.env.PORT;
  const app = await NestFactory.create(AppModule, {
    logger: console,
    cors: true
  });
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
 
  await app.listen(PORT);
}
bootstrap();
