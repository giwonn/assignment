import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import localEnvConfig from '@/config/local-env.config';
import { ProxyController } from '@/proxy.controller';
import { ProxyService } from '@/proxy.service';
import { RouteService } from '@/route.service';
import { IgnoreStaticRequestMiddleware } from '@/shared/middleware/ignore-static-request.middleware';
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
  controllers: [ProxyController],
  providers: [ProxyService, RouteService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(IgnoreStaticRequestMiddleware).forRoutes('*');
  }
}
