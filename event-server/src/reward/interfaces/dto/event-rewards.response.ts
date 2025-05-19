import { RewardResult } from '@/reward/application/dto/reward.result';

export class EventRewardsResponse {
  reward: RewardResult;

  public static of(reward: RewardResult): EventRewardsResponse {
    const response = new EventRewardsResponse();
    response.reward = reward;
    return response;
  }
}
