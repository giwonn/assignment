import { Module } from '@nestjs/common';
import { Event, EventSchema } from '@/event/domain/event.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { EventController } from '@/event/interfaces/event.controller';
import { EventService } from '@/event/application/event.service';
import { EventMongooseRepository } from '@/event/infrastructure/event-mongoose.repository';
import { EventRepository } from '@/event/domain/event.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Event.name, schema: EventSchema }]),
  ],
  controllers: [EventController],
  providers: [
    EventService,
    {
      provide: EventRepository,
      useClass: EventMongooseRepository,
    },
  ],
})
export class EventModule {}
