import { Module } from '@nestjs/common';
import { RewardModule } from './reward/reward.module';
import { EventModule } from '@/event/event.module';
import localEnvConfig from '@/config/local-env.config';
import { ConfigModule } from '@nestjs/config';
import { MongooseConfigModule } from '@/config/mongoose-config.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [localEnvConfig] }),
    MongooseConfigModule,
    EventModule,
    RewardModule,
  ],
})
export class AppModule {}
