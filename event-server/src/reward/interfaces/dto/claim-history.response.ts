import { ClaimHistoryResult } from '@/reward/application/dto/claim-history.result';

export class ClaimHistoryResponse {
  claimHistories: ClaimHistoryResult[];

  constructor(claimHistories: ClaimHistoryResult[]) {
    this.claimHistories = claimHistories;
  }

  static from(claimHistories: ClaimHistoryResult[]) {
    return new ClaimHistoryResponse(claimHistories);
  }
}
