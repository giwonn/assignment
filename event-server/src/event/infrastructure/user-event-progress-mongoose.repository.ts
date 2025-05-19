import { UserEventProgress } from '@/event/domain/user-event-progress.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { UserEventProgressRepository } from '@/event/domain/user-event-progress.repository';

export class UserEventProgressMongooseRepository
  implements UserEventProgressRepository
{
  constructor(
    @InjectModel(UserEventProgress.name)
    private readonly userEventProgressModel: Model<UserEventProgress>,
  ) {}

  async findByUserIdAndEventId(
    userId: string,
    eventId: string,
  ): Promise<UserEventProgress | null> {
    const doc = await this.userEventProgressModel
      .findOne({ userId, event: new Types.ObjectId(eventId) })
      .exec();

    if (!doc) return null;
    return UserEventProgress.from(doc);
  }

  async create(
    userEventProgress: UserEventProgress,
  ): Promise<UserEventProgress> {
    const doc = await this.userEventProgressModel.create(userEventProgress);
    return UserEventProgress.from(doc);
  }

  async claim(
    userEventProgress: UserEventProgress,
  ): Promise<UserEventProgress> {
    const doc = await this.userEventProgressModel
      .findOneAndUpdate(
        {
          userId: userEventProgress.userId,
          event: new Types.ObjectId(userEventProgress.eventId),
          isClaimed: false,
        },
        { $set: { isClaimed: true } },
        { new: true },
      )
      .exec();

    if (!doc) throw new Error('UserEventProgress not found');
    return UserEventProgress.from(doc);
  }
}
