import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { CreateEventProgressDto } from '@/event/application/dto/create-event-progress.dto';
import { Transform } from 'class-transformer';

export class CreateEventProgressRequest {
  @IsString()
  @IsNotEmpty()
  eventId: string;

  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  maxCount: number;

  toDto(userId: string) {
    const dto = new CreateEventProgressDto();
    dto.eventId = this.eventId;
    dto.userId = userId;
    dto.maxCount = this.maxCount;
    return dto;
  }
}
