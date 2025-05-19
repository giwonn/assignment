import { IsDate, IsEnum, IsInt, IsOptional } from 'class-validator';
import { EventType } from '@/event/event.enum';
import { FindEventsDto } from '@/event/application/dto/find-events.dto';
import { Transform, Type } from 'class-transformer';

export class FindEventsRequest {
  @IsOptional()
  @IsEnum(EventType)
  type?: EventType;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  from?: Date;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  to?: Date;

  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  page: number = 1;

  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  pageSize: number = 10;

  toDto(): FindEventsDto {
    const dto = new FindEventsDto();
    dto.type = this.type;
    dto.startAt = this.from;
    dto.endAt = this.to;
    dto.page = this.page;
    dto.pageSize = this.pageSize;

    return dto;
  }
}
