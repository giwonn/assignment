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
    return await this.userModel.findOne({ email }).exec();
  }

  async create(user: User): Promise<User> {
    return this.userModel.create(user);
  }
}
