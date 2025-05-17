import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { LibModule } from '@/shared/libs/lib.module';
import { UserModule } from '@/user/user.module';
import { MongooseConfigModule } from '@/config/mongoose-config.module';
import { AuthModule } from './auth/auth.module';
import localEnvConfig from '@/config/local-env.config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [localEnvConfig] }),
    MongooseConfigModule,
    LibModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
