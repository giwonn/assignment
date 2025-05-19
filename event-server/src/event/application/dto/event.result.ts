import { EventType } from '@/event/event.enum';
import { Event } from '@/event/domain/event.entity';

export class EventResult {
  id: string;
  title: string;
  type: EventType;
  details: Record<string, any>;
  startAt: Date;
  endAt: Date;
  status: 'ACTIVE' | 'INACTIVE';

  public static of(event: Event, now: Date) {
    const result = new EventResult();
    result.id = event.id;
    result.title = event.title;
    result.type = event.type;
    result.details = event.details;
    result.startAt = event.startAt;
    result.endAt = event.endAt;
    result.status = event.isActive(now) ? 'ACTIVE' : 'INACTIVE';
    return result;
  }
}
