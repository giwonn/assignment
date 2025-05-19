import { EventType } from '@/event/event.enum';

export class FindEventsDto {
  type?: EventType;
  startAt?: Date;
  endAt?: Date;
  page: number = 1;
  pageSize: number = 10;
}
