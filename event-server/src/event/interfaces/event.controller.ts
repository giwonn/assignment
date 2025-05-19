import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { FindEventsRequest } from '@/event/interfaces/dto/find-events.request';
import { EventService } from '@/event/application/event.service';
import { CreateEventRequest } from '@/event/interfaces/dto/create-event.request';

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
}
