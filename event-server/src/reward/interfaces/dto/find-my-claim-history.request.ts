import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { FindClaimHistoryDto } from '@/reward/application/dto/find-claim-history.dto';

export class FindMyClaimHistoryRequest {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  eventId?: string;

  @IsOptional()
  @IsBoolean()
  success?: boolean;

  toDto(userId: string): FindClaimHistoryDto {
    return new FindClaimHistoryDto({
      eventId: this.eventId,
      userId: userId,
      success: this.success,
    });
  }
}
