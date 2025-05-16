import { UserRole } from '@/shared/enums/user-role.enum';
import { User } from '@/user/domain/user.entity';

export class CreateUserDto {
  email: string;

  name: string;

  rawPassword: string;

  roles: UserRole[];

  public toEntity(hashedPassword: string): User {
    const user = new User();
    user.email = this.email;
    user.name = this.name;
    user.hashedPassword = hashedPassword;
    user.roles = this.roles;
    return user;
  }
}
