import { IsNotEmpty, IsString } from 'class-validator';
import { ClaimRewardDto } from '@/reward/application/dto/claim-reward.dto';

export class ClaimRewardRequest {
  @IsString()
  @IsNotEmpty()
  eventId: string;

  toDto(userId: string) {
    const dto = new ClaimRewardDto();
    dto.eventId = this.eventId;
    dto.userId = userId;
    return dto;
  }
}
