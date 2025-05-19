import { RewardClaimHistory } from '@/reward/domain/reward-claim-history.entity';

export abstract class RewardClaimHistoryRepository {
  abstract create(
    rewardClaimHistory: RewardClaimHistory,
  ): Promise<RewardClaimHistory>;

}
