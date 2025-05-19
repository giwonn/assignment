import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { RewardClaimHistoryRepository } from '@/reward/domain/reward-claim-history.repository';
import { RewardClaimHistory } from '@/reward/domain/reward-claim-history.entity';

@Injectable()
export class RewardClaimHistoryMongooseRepository
  implements RewardClaimHistoryRepository
{
  constructor(
    @InjectModel(RewardClaimHistory.name)
    private readonly rewardClaimHistory: Model<RewardClaimHistory>,
  ) {}

  async findClaimHistories(
    conditions: Partial<RewardClaimHistory>,
  ): Promise<RewardClaimHistory[]> {
    const docs = await this.rewardClaimHistory
      .find(conditions)
      .sort({ createdAt: -1 })
      .exec();

    return docs.map((doc) => RewardClaimHistory.from(doc));
  }

  async create(
    rewardClaimHistory: RewardClaimHistory,
  ): Promise<RewardClaimHistory> {
    return await this.rewardClaimHistory.create(rewardClaimHistory);
  }
}
