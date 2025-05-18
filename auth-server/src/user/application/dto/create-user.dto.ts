import { UserRole } from '@/shared/enums/user-role.enum';
import { User } from '@/user/domain/user.entity';

export class CreateUserDto {
  email: string;

  name: string;

  rawPassword: string;

  roles: UserRole[];

  public toEntity(hashedPassword: string): User {
    return User.create({
      email: this.email,
      name: this.name,
      hashedPassword,
      roles: this.roles,
    });
  }
}
