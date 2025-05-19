import { Injectable } from '@nestjs/common';
import { RewardRepository } from '@/reward/domain/reward.repository';
import { RewardResult } from '@/reward/application/dto/reward.result';
import { CreateRewardDto } from '@/reward/application/dto/create-reward.dto';
import {
  RewardAlreadyExistsException,
  RewardNotFoundException,
} from '@/reward/reward.exception';
import { FindClaimHistoryDto } from '@/reward/application/dto/find-claim-history.dto';
import { RewardClaimHistoryRepository } from '@/reward/domain/reward-claim-history.repository';
import { ClaimHistoryResult } from '@/reward/application/dto/claim-history.result';
import {
  RewardAlreadyClaimedExistsException,
  UserEventProgressIsNotCompletedException,
  UserEventProgressNotFoundException,
} from '@/event/event.exception';
import { RewardClaimHistory } from '@/reward/domain/reward-claim-history.entity';
import { ClaimRewardDto } from '@/reward/application/dto/claim-reward.dto';
import { ClaimRewardResult } from '@/reward/application/dto/claim-reward.result';
import { UserEventProgressRepository } from '@/event/domain/user-event-progress.repository';

@Injectable()
export class RewardService {
  constructor(
    private readonly rewardRepository: RewardRepository,
    private readonly rewardClaimHistoryRepository: RewardClaimHistoryRepository,
    private readonly userEventProgressRepository: UserEventProgressRepository,
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

  async claimReward(dto: ClaimRewardDto): Promise<ClaimRewardResult> {
    // 보상 요청할 유저 이벤트 현황을 가져온다.
    const eventProgress =
      await this.userEventProgressRepository.findByUserIdAndEventId(
        dto.userId,
        dto.eventId,
      );
    if (eventProgress == null) throw new UserEventProgressNotFoundException();

    // 이벤트 조건을 못채웠으면 실패 이력을 남기고 예외를 발생시킨다
    if (!eventProgress.isClaimable()) {
      await this.rewardClaimHistoryRepository.create(
        RewardClaimHistory.of({
          eventId: dto.eventId,
          userId: dto.userId,
          isSucceed: false,
        }),
      );
      throw new UserEventProgressIsNotCompletedException();
    }

    // 이미 보상을 수령한 경우
    if (eventProgress.isClaimed) {
      await this.rewardClaimHistoryRepository.create(
        RewardClaimHistory.of({
          eventId: dto.eventId,
          userId: dto.userId,
          isSucceed: false,
        }),
      );
      throw new RewardAlreadyClaimedExistsException();
    }

    // 보상 요청할 유저 이벤트 현황을 업데이트한다.
    await this.userEventProgressRepository.claim(eventProgress);

    // 이벤트 조건을 만족했으면, RewardClaimHistory에 이력을 성공으로 저장한다
    await this.rewardClaimHistoryRepository.create(
      RewardClaimHistory.of({
        eventId: dto.eventId,
        userId: dto.userId,
        isSucceed: true,
      }),
    );

    // 보상을 리턴한다.
    const reward = await this.rewardRepository.findByEventId(dto.eventId);
    if (reward == null) throw new RewardNotFoundException();

    return ClaimRewardResult.from(reward);
  }

  async findClaimHistories(dto: FindClaimHistoryDto) {
    const conditions = JSON.parse(JSON.stringify(dto)) as FindClaimHistoryDto;
    const claimHistories =
      await this.rewardClaimHistoryRepository.findClaimHistories(conditions);

    return claimHistories.map((claimHistory) =>
      ClaimHistoryResult.from(claimHistory),
    );
  }
}
