import { Global, Module, Provider } from '@nestjs/common';
import { HashLib } from '@/shared/libs/hash.lib';
import { JwtLib } from '@/shared/libs/jwt.lib';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

const providers: Provider[] = [HashLib, JwtLib];

@Global()
@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET_KEY'),
      }),
    }),
  ],
  providers,
  exports: providers,
})
export class LibModule {}
