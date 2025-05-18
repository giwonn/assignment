import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { UserRole } from '@/shared/enums/user-role.enum';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  protected _id: string;
  get id(): string {
    if (!this._id) throw new Error('id not set');
    return this._id;
  }

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  hashedPassword: string;

  @Prop({
    required: true,
    enum: UserRole,
    type: [String],
  })
  roles: UserRole[];

  public static from(document: UserDocument): User {
    const user = new User();
    user._id = document._id.toString();
    user.email = document.email;
    user.name = document.name;
    user.hashedPassword = document.hashedPassword;
    user.roles = document.roles;

    return user;
  }
}

export const UserSchema = SchemaFactory.createForClass(User);
