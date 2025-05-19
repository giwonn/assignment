import { RewardType } from '@/reward/reward.enum';
import { Reward } from '@/reward/domain/reward.entity';

export class CreateRewardDto {
  eventId: string;
  type: RewardType;
  targetId: string;
  quantity: number;

  toEntity(): Reward {
    const reward = new Reward();
    reward.eventId = this.eventId;
    reward.type = this.type;
    reward.targetId = this.targetId;
    reward.quantity = this.quantity;

    return reward;
  }
}
