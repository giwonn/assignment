import { EventResult } from '@/event/application/dto/event.result';

export class FindEventsResult {
  events: EventResult[];
  page: number;
  total: number;

  public static of(params: {
    events: EventResult[];
    page: number;
    total: number;
  }): FindEventsResult {
    const result = new FindEventsResult();
    result.events = params.events;
    result.page = params.page;
    result.total = params.total;
    return result;
  }
}
