import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { EventType } from '@/event/event.enum';
import { Expose } from 'class-transformer';

export type EventDocument = HydratedDocument<Event>;

@Schema({ timestamps: true })
export class Event {
  protected _id: string;

  @Expose()
  get id(): string {
    if (!this._id) throw new Error('id not set');
    return this._id;
  }

  @Prop({ required: true })
  title: string;

  @Prop({ required: true, enum: EventType })
  type: EventType;

  @Prop({ required: true, type: Map, of: MongooseSchema.Types.Mixed })
  details: Record<string, any>;

  @Prop({ required: true })
  startAt: Date;

  @Prop({ required: true })
  endAt: Date;

  public static from(document: EventDocument): Event {
    const event = new Event();
    event._id = document._id.toString();
    event.title = document.title;
    event.type = document.type;
    event.details = document.details;
    event.startAt = document.startAt;
    event.endAt = document.endAt;

    return event;
  }

  public static create(params: Omit<Event, 'id'>): Event {
    const event = new Event();
    event.title = params.title;
    event.type = params.type;
    event.details = params.details;
    event.startAt = params.startAt;
    event.endAt = params.endAt;

    return event;
  }

  isActive(date: Date): boolean {
    return this.startAt <= date && date <= this.endAt;
  }
}

export const EventSchema = SchemaFactory.createForClass(Event);
