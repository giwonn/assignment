import { Reward } from '@/reward/domain/reward.entity';

export abstract class RewardRepository {
  abstract findByEventId(eventId: string): Promise<Reward | null>;
  abstract create(reward: Reward): Promise<Reward>;
}
