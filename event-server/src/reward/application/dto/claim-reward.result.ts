import { Reward } from '@/reward/domain/reward.entity';
import { RewardType } from '@/reward/reward.enum';

export class ClaimRewardResult {
  id: string;
  eventId: string;
  type: RewardType;
  targetId: string;
  quantity: number;

  constructor(
    id: string,
    eventId: string,
    type: RewardType,
    targetId: string,
    quantity: number,
  ) {
    this.id = id;
    this.eventId = eventId;
    this.type = type;
    this.targetId = targetId;
    this.quantity = quantity;
  }

  static from(reward: Reward): ClaimRewardResult {
    return new ClaimRewardResult(
      reward.id,
      reward.eventId,
      reward.type,
      reward.targetId,
      reward.quantity,
    );
  }
}
