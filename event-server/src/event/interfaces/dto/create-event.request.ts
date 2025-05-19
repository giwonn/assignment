import { EventType } from '@/event/event.enum';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsObject,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateEventDto } from '@/event/application/dto/create-event.dto';

export class CreateEventRequest {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsEnum(EventType)
  type: EventType;

  @IsObject()
  @IsNotEmpty()
  details: Record<string, any>;

  @Type(() => Date)
  @IsDate()
  from: Date;

  @Type(() => Date)
  @IsDate()
  to: Date;

  toDto() {
    const dto = new CreateEventDto();
    dto.title = this.title;
    dto.type = this.type;
    dto.details = this.details;
    dto.startAt = this.from;
    dto.endAt = this.to;

    return dto;
  }
}
