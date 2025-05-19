import { EventType } from '@/event/event.enum';
import { Event } from '@/event/domain/event.entity';

export class CreateEventDto {
  title: string;
  type: EventType;
  details: Record<string, any>;
  startAt: Date;
  endAt: Date;

  toEntity(): Event {
    const event = new Event();
    event.title = this.title;
    event.type = this.type;
    event.details = this.details;
    event.startAt = this.startAt;
    event.endAt = this.endAt;

    return event;
  }
}
