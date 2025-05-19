import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { RewardService } from '@/reward/application/reward.service';
import { CreateRewardRequest } from './dto/create-reward.request';
@Controller('rewards')
export class RewardController {
  constructor(private readonly rewardService: RewardService) {}
  @Post()
  async create(@Body() request: CreateRewardRequest) {
    await this.rewardService.create(request.toDto());
  }
}
