import { IsEnum, IsInt, IsNotEmpty, IsString } from 'class-validator';
import { RewardType } from '@/reward/reward.enum';
import { Transform } from 'class-transformer';
import { CreateRewardDto } from '@/reward/application/dto/create-reward.dto';

export class CreateRewardRequest {
  @IsString()
  @IsNotEmpty()
  eventId: string;

  @IsEnum(RewardType)
  type: RewardType;

  @IsString()
  @IsNotEmpty()
  targetId: string;

  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  quantity: number;

  toDto(): CreateRewardDto {
    const dto = new CreateRewardDto();
    dto.eventId = this.eventId;
    dto.type = this.type;
    dto.targetId = this.targetId;
    dto.quantity = this.quantity;

    return dto;
  }
}
