import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { FindClaimHistoryDto } from '@/reward/application/dto/find-claim-history.dto';

export class FindClaimHistoryRequest {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  eventId?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  userId?: string;

  @IsOptional()
  @IsBoolean()
  success?: boolean;

  constructor(eventId: string, userId: string) {
    this.eventId = eventId;
    this.userId = userId;
  }

  toDto(): FindClaimHistoryDto {
    return new FindClaimHistoryDto({
      eventId: this.eventId,
      userId: this.userId,
      success: this.success,
    });
  }
}
