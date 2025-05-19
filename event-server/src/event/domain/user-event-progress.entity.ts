import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type UserEventProgressDocument = HydratedDocument<UserEventProgress>;

@Schema({ timestamps: true })
export class UserEventProgress {
  @Prop({ required: true })
  userId: string;

  @Prop({ type: Types.ObjectId, ref: 'Event', required: true })
  protected event: Types.ObjectId;

  get eventId(): string {
    return this.event.toString();
  }

  set eventId(eventId: string) {
    this.event = new Types.ObjectId(eventId);
  }

  @Prop({ default: 0 })
  count: number;

  @Prop({ required: true })
  maxCount: number;

  @Prop({ default: false })
  isClaimed: boolean;

  isClaimable(): boolean {
    return this.count >= this.maxCount;
  }

  public static from(document: UserEventProgressDocument): UserEventProgress {
    const userEventProgress = new UserEventProgress();
    userEventProgress.userId = document.userId;
    userEventProgress.eventId = document.event.toString();
    userEventProgress.count = document.count;
    userEventProgress.maxCount = document.maxCount;
    userEventProgress.isClaimed = document.isClaimed;

    return userEventProgress;
  }
}

export const UserEventProgressSchema =
  SchemaFactory.createForClass(UserEventProgress);

UserEventProgressSchema.index({ event: 1, userId: 1 }, { unique: true });
