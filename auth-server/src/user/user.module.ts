import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '@/user/domain/user.entity';
import { UserService } from '@/user/application/user.service';
import { UserController } from '@/user/interfaces/user.controller';
import { UserMongooseRepository } from '@/user/infrastructure/user-mongoose.repository';
import { UserRepository } from '@/user/domain/user.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: UserRepository,
      useClass: UserMongooseRepository,
    },
  ],
})
export class UserModule {}
