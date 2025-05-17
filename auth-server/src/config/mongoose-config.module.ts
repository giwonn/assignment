import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
        auth: {
          username: configService.get<string>('MONGO_INITDB_ROOT_USERNAME'),
          password: configService.get<string>('MONGO_INITDB_ROOT_PASSWORD'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
})
export class MongooseConfigModule {}
