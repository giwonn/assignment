import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { RewardService } from '@/reward/application/reward.service';
import { CreateRewardRequest } from './dto/create-reward.request';
import { EventRewardsResponse } from '@/reward/interfaces/dto/event-rewards.response';
import { FindMyClaimHistoryRequest } from '@/reward/interfaces/dto/find-my-claim-history.request';
import { FindClaimHistoryRequest } from '@/reward/interfaces/dto/find-claim-history.request';
import { UserId } from '@/shared/decorators/user-id.decorator';
import { ClaimHistoryResponse } from '@/reward/interfaces/dto/claim-history.response';
import { ClaimRewardRequest } from '@/reward/interfaces/dto/claim-reward.request';

@Controller('rewards')
export class RewardController {
  constructor(private readonly rewardService: RewardService) {}

  @Get()
  async findByEventId(
    @Query('eventId') eventId: string,
  ): Promise<EventRewardsResponse> {
    const reward = await this.rewardService.findByEventId(eventId);
    return EventRewardsResponse.of(reward);
  }

  @Post()
  async create(@Body() request: CreateRewardRequest) {
    await this.rewardService.create(request.toDto());
  }

  @Post('claims')
  claimReward(@Body() request: ClaimRewardRequest, @UserId() userId: string) {
    return this.rewardService.claimReward(request.toDto(userId));
  }

  @Get('claim-histories/me')
  async findMyClaimHistories(
    @Query() request: FindMyClaimHistoryRequest,
    @UserId() userId: string,
  ) {
    const claimHistories = await this.rewardService.findClaimHistories(
      request.toDto(userId),
    );
    return ClaimHistoryResponse.from(claimHistories);
  }

  @Get('claim-histories')
  async findClaimHistories(@Query() request: FindClaimHistoryRequest) {
    const claimHistories = await this.rewardService.findClaimHistories(
      request.toDto(),
    );

    return ClaimHistoryResponse.from(claimHistories);
  }
}
