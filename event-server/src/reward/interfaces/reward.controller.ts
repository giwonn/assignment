import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { RewardService } from '@/reward/application/reward.service';
import { CreateRewardRequest } from './dto/create-reward.request';
import { EventRewardsResponse } from '@/reward/interfaces/dto/event-rewards.response';
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
}
