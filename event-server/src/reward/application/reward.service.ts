import { Injectable } from '@nestjs/common';
import { RewardRepository } from '@/reward/domain/reward.repository';
import {
  RewardAlreadyExistsException,
} from '@/reward/reward.exception';
@Injectable()
export class RewardService {
  constructor(
    private readonly rewardRepository: RewardRepository,
  ) {}
  async create(dto: CreateRewardDto): Promise<void> {
    const reward = await this.rewardRepository.findByEventId(dto.eventId);
    if (reward != null) throw new RewardAlreadyExistsException();
    await this.rewardRepository.create(dto.toEntity());
  }
}
