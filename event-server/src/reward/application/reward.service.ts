import { Injectable } from '@nestjs/common';
import { RewardRepository } from '@/reward/domain/reward.repository';
import { RewardResult } from '@/reward/application/dto/reward.result';
import {
  RewardAlreadyExistsException,
  RewardNotFoundException,
} from '@/reward/reward.exception';
@Injectable()
export class RewardService {
  constructor(
    private readonly rewardRepository: RewardRepository,
  ) {}

  async findByEventId(eventId: string): Promise<RewardResult> {
    const reward = await this.rewardRepository.findByEventId(eventId);
    if (reward == null) throw new RewardNotFoundException();
    return RewardResult.from(reward);
  }

  async create(dto: CreateRewardDto): Promise<void> {
    const reward = await this.rewardRepository.findByEventId(dto.eventId);
    if (reward != null) throw new RewardAlreadyExistsException();
    await this.rewardRepository.create(dto.toEntity());
  }
}
