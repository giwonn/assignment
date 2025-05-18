import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const port =
    process.env.NODE_ENV === 'development' ? 3002 : Number(process.env.PORT);
  await app.listen(port);
}
bootstrap();
