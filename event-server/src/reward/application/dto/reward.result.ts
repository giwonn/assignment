import { Reward } from '@/reward/domain/reward.entity';

export class RewardResult {
  id: string;
  eventId: string;
  type: string;
  targetId: string;
  quantity: number;

  public static from(reward: Reward): RewardResult {
    const result = new RewardResult();
    result.id = reward.id;
    result.eventId = reward.eventId;
    result.type = reward.type;
    result.targetId = reward.targetId;
    result.quantity = reward.quantity;

    return result;
  }
}
