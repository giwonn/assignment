import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '@/user/domain/user.entity';
import { Model } from 'mongoose';
import { UserRepository } from '@/user/domain/user.repository';

@Injectable()
export class UserMongooseRepository extends UserRepository {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {
    super();
  }

  async findByEmail(email: string): Promise<User | null> {
    const doc = await this.userModel.findOne({ email }).exec();
    return doc ? User.from(doc) : null;
  }

  async create(user: User): Promise<User> {
    const doc = await this.userModel.create(user);
    return User.from(doc);
  }
}
