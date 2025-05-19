import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { FindEventsRequest } from '@/event/interfaces/dto/find-events.request';
import { EventService } from '@/event/application/event.service';
import { CreateEventRequest } from '@/event/interfaces/dto/create-event.request';
import { UserId } from '@/shared/decorators/user-id.decorator';
import { CreateEventProgressRequest } from '@/event/interfaces/dto/create-event-progress.request';

@Controller('events')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Get()
  findEvents(@Query() request: FindEventsRequest) {
    return this.eventService.findEvents(request.toDto());
  }

  @Post()
  createEvent(@Body() request: CreateEventRequest) {
    return this.eventService.create(request.toDto());
  }

  @Post('progress')
  async createEventProgress(
    @Body() request: CreateEventProgressRequest,
    @UserId() userId: string,
  ) {
    await this.eventService.createEventProgress(request.toDto(userId));
  }
}
