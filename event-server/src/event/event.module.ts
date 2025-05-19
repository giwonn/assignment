import { Module } from '@nestjs/common';
import { Event, EventSchema } from '@/event/domain/event.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { EventController } from '@/event/interfaces/event.controller';
import { EventService } from '@/event/application/event.service';
import { EventMongooseRepository } from '@/event/infrastructure/event-mongoose.repository';
import { EventRepository } from '@/event/domain/event.repository';
import { UserEventProgressRepository } from '@/event/domain/user-event-progress.repository';
import { UserEventProgressMongooseRepository } from '@/event/infrastructure/user-event-progress-mongoose.repository';
import { RewardModule } from '@/reward/reward.module';
import {
  UserEventProgress,
  UserEventProgressSchema,
} from '@/event/domain/user-event-progress.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Event.name, schema: EventSchema }]),
    MongooseModule.forFeature([
      { name: UserEventProgress.name, schema: UserEventProgressSchema },
    ]),
  ],
  controllers: [EventController],
  providers: [
    EventService,
    {
      provide: EventRepository,
      useClass: EventMongooseRepository,
    },
    {
      provide: UserEventProgressRepository,
      useClass: UserEventProgressMongooseRepository,
    },
  ],
  exports: [UserEventProgressRepository],
})
export class EventModule {}
