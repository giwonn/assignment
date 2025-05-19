import { Injectable } from '@nestjs/common';
import { FindEventsDto } from '@/event/application/dto/find-events.dto';
import { EventRepository } from '@/event/domain/event.repository';
import { FindEventsResult } from '@/event/application/dto/find-events.result';
import { CreateEventDto } from '@/event/application/dto/create-event.dto';
import { EventResult } from '@/event/application/dto/event.result';

@Injectable()
export class EventService {
  constructor(private readonly eventRepository: EventRepository) {}

  async findEvents(dto: FindEventsDto) {
    const { events, total } = await this.eventRepository.findEvents(
      dto,
      dto.page,
      dto.pageSize,
    );

    const now = new Date();

    return FindEventsResult.of({
      events: events.map((event) => EventResult.of(event, now)),
      page: dto.page,
      total,
    });
  }

  async create(dto: CreateEventDto): Promise<EventResult> {
    const event = await this.eventRepository.create(dto.toEntity());
    return EventResult.of(event, new Date());
  }
}
