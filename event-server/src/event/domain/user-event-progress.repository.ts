import { UserEventProgress } from '@/event/domain/user-event-progress.entity';

export abstract class UserEventProgressRepository {
  abstract findByUserIdAndEventId(
    userId: string,
    eventId: string,
  ): Promise<UserEventProgress | null>;
  abstract create(
    userEventProgress: UserEventProgress,
  ): Promise<UserEventProgress>;
  abstract claim(
    userEventProgress: UserEventProgress,
  ): Promise<UserEventProgress>;
}
