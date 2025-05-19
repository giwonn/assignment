import { Injectable } from '@nestjs/common';
import { FindEventsDto } from '@/event/application/dto/find-events.dto';
import { EventRepository } from '@/event/domain/event.repository';
import { FindEventsResult } from '@/event/application/dto/find-events.result';
import { CreateEventDto } from '@/event/application/dto/create-event.dto';
import { EventResult } from '@/event/application/dto/event.result';
import { UserEventProgressRepository } from '@/event/domain/user-event-progress.repository';
import { UserEventProgressAlreadyExistsException } from '@/event/event.exception';
import { CreateEventProgressDto } from '@/event/application/dto/create-event-progress.dto';

@Injectable()
export class EventService {
  constructor(
    private readonly eventRepository: EventRepository,
    private readonly userEventProgressRepository: UserEventProgressRepository,
  ) {}

  async findEvents(dto: FindEventsDto): Promise<FindEventsResult> {
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

  async createEventProgress(dto: CreateEventProgressDto): Promise<void> {
    // 유저 이벤트 진행 현황을 조회한다.
    const eventProgress =
      await this.userEventProgressRepository.findByUserIdAndEventId(
        dto.userId,
        dto.eventId,
      );

    if (eventProgress != null) {
      throw new UserEventProgressAlreadyExistsException();
    }
    await this.userEventProgressRepository.create(dto.toEntity());
  }
}
