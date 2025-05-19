import { UserEventProgress } from '@/event/domain/user-event-progress.entity';

export class CreateEventProgressDto {
  eventId: string;
  userId: string;
  maxCount: number;

  toEntity() {
    const entity = new UserEventProgress();
    entity.eventId = this.eventId;
    entity.userId = this.userId;
    entity.maxCount = this.maxCount;
    return entity;
  }
}
