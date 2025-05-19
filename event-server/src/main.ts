import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  const port =
    process.env.NODE_ENV === 'development' ? 3002 : Number(process.env.PORT);
  await app.listen(port);
}
bootstrap();
