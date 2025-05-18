import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import localEnvConfig from '@/config/local-env.config';
import { LoggerModule } from '@/shared/logger/logger.module';
import { GuardModule } from '@/shared/guard/guard.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [localEnvConfig],
    }),
    HttpModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config
          .getOrThrow<string>('JWT_SECRET_KEY')
          .replace(/\\n/g, '\n'),
      }),
    }),
    LoggerModule,
    GuardModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
