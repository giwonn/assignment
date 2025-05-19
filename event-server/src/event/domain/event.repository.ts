import { Event } from '@/event/domain/event.entity';

export abstract class EventRepository {
  abstract findEvents(
    conditions: Partial<Pick<Event, 'type'>>,
    page: number,
    pageSize: number,
  ): Promise<{ events: Event[]; total: number }>;

  abstract create(event: Event): Promise<Event>;
}
