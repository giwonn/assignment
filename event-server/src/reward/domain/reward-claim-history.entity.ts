import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type RewardClaimDocument = HydratedDocument<RewardClaimHistory>;

@Schema({ timestamps: true })
export class RewardClaimHistory {
  @Prop({ type: Types.ObjectId, ref: 'Event', required: true })
  protected event: Types.ObjectId;

  get eventId(): string {
    if (!this.event) throw new Error('event not set');
    return this.event.toString();
  }

  set eventId(value: string) {
    this.event = new Types.ObjectId(value);
  }

  @Prop({ required: true })
  userId: string;

  @Prop({ default: false })
  isSucceed: boolean;

  @Prop({ default: '' })
  reason?: string; // 실패 사유

  public static of(params: {
    eventId: string;
    userId: string;
    isSucceed: boolean;
    reason?: string;
  }): RewardClaimHistory {
    const rewardClaim = new RewardClaimHistory();
    rewardClaim.eventId = params.eventId;
    rewardClaim.userId = params.userId;
    rewardClaim.isSucceed = params.isSucceed;
    rewardClaim.reason = params.reason;

    return rewardClaim;
  }

  static from(document: RewardClaimDocument): RewardClaimHistory {
    const rewardClaim = new RewardClaimHistory();
    rewardClaim.eventId = document.eventId;
    rewardClaim.userId = document.userId;
    rewardClaim.isSucceed = document.isSucceed;
    rewardClaim.reason = document.reason;

    return rewardClaim;
  }
}

export const RewardClaimSchema =
  SchemaFactory.createForClass(RewardClaimHistory);
