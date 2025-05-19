import { Reward } from '@/reward/domain/reward.entity';

export abstract class RewardRepository {
  abstract create(reward: Reward): Promise<Reward>;
}
