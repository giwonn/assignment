import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Expose } from 'class-transformer';
import { RewardType } from '@/reward/reward.enum';

export type RewardDocument = HydratedDocument<Reward>;

@Schema({ timestamps: true })
export class Reward {
  protected _id: string;

  @Expose()
  get id(): string {
    if (!this._id) throw new Error('id not set');
    return this._id.toString();
  }

  @Prop({ type: Types.ObjectId, ref: 'Event', required: true, unique: true })
  private event: Types.ObjectId;

  get eventId(): string {
    return this.event.toString();
  }

  set eventId(eventId: string) {
    this.event = new Types.ObjectId(eventId);
  }

  @Prop({ required: true, enum: RewardType })
  type: RewardType; // 'item' | 'point' | 'coupon'

  @Prop({ required: true })
  targetId: string; // 예: 아이템id, 포인트id, 쿠폰id 등

  @Prop({ required: true })
  quantity: number;

  public static from(document: RewardDocument): Reward {
    const reward = new Reward();
    reward._id = document._id.toString();
    reward.event = document.event;
    reward.type = document.type;
    reward.targetId = document.targetId;
    reward.quantity = document.quantity;

    return reward;
  }
}

export const RewardSchema = SchemaFactory.createForClass(Reward);
