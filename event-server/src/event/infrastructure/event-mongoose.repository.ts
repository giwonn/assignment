import { Injectable } from '@nestjs/common';
import { Event, EventDocument } from '@/event/domain/event.entity';
import { Model } from 'mongoose';
import { EventRepository } from '@/event/domain/event.repository';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class EventMongooseRepository implements EventRepository {
  constructor(
    @InjectModel(Event.name) private readonly eventModel: Model<Event>,
  ) {}

  async findEvents(
    conditions: Partial<Pick<Event, 'type' | 'startAt' | 'endAt'>>,
    page: number,
    pageSize: number,
  ): Promise<{ events: Event[]; total: number }> {
    const skip = (page - 1) * pageSize;
    const query: Record<string, any> = {};
    if (conditions.type) query.type = conditions.type;
    if (conditions.startAt) query.startAt = { $gte: conditions.startAt };
    if (conditions.endAt) query.endAt = { $lte: conditions.endAt };

    const [docs, totalCount] = await Promise.all([
      this.eventModel
        .find(query)
        .skip(skip)
        .limit(pageSize)
        .sort({ startAt: -1 })
        .exec(),
      this.eventModel.countDocuments(query),
    ]);

    return {
      events: docs.map((doc) => Event.from(doc)),
      total: totalCount,
    };
  }

  async findById(eventId: string): Promise<Event | null> {
    const doc = await this.eventModel.findById(eventId).exec();
    if (!doc) return null;
    return Event.from(doc);
  }

  async create(event: Event): Promise<Event> {
    const doc: EventDocument = await this.eventModel.create(event);
    return Event.from(doc);
  }
}
