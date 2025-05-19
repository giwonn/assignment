import { RewardClaimHistory } from '@/reward/domain/reward-claim-history.entity';

export class ClaimHistoryResult {
  eventId: string;
  userId: string;
  isSucceed: boolean;
  reason?: string;

  constructor(
    eventId: string,
    userId: string,
    isSucceed: boolean,
    reason?: string,
  ) {
    this.eventId = eventId;
    this.userId = userId;
    this.isSucceed = isSucceed;
    this.reason = reason;
  }

  static from(entity: RewardClaimHistory) {
    return new ClaimHistoryResult(
      entity.eventId,
      entity.userId,
      entity.isSucceed,
      entity.reason,
    );
  }
}
