import { Module } from '@nestjs/common';
import { RewardService } from '@/reward/application/reward.service';
import { RewardController } from '@/reward/interfaces/reward.controller';
import { RewardRepository } from '@/reward/domain/reward.repository';
import { RewardMongooseRepository } from '@/reward/infrastructure/reward-mongoose.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Reward, RewardSchema } from './domain/reward.entity';
import { RewardClaimHistoryRepository } from '@/reward/domain/reward-claim-history.repository';
import { RewardClaimHistoryMongooseRepository } from '@/reward/infrastructure/reward-claim-history-mongoose.repository';
import {
  RewardClaimHistory,
  RewardClaimSchema,
} from '@/reward/domain/reward-claim-history.entity';
import { EventModule } from '@/event/event.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Reward.name, schema: RewardSchema }]),
    MongooseModule.forFeature([
      { name: RewardClaimHistory.name, schema: RewardClaimSchema },
    ]),
    EventModule,
  ],
  controllers: [RewardController],
  providers: [
    RewardService,
    {
      provide: RewardRepository,
      useClass: RewardMongooseRepository,
    },
    {
      provide: RewardClaimHistoryRepository,
      useClass: RewardClaimHistoryMongooseRepository,
    },
  ],
})
export class RewardModule {}
