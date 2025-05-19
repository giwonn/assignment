import { Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { RewardRepository } from '@/reward/domain/reward.repository';
import { Reward } from '@/reward/domain/reward.entity';

@Injectable()
export class RewardMongooseRepository implements RewardRepository {
  constructor(
    @InjectModel(Reward.name) private readonly rewardModel: Model<Reward>,
  ) {}

  async findByEventId(eventId: string): Promise<Reward | null> {
    const doc = await this.rewardModel
      .findOne({ event: new Types.ObjectId(eventId) })
      .exec();
    if (!doc) return null;
    return Reward.from(doc);
  }

  async create(reward: Reward): Promise<Reward> {
    return await this.rewardModel.create(reward);
  }
}
