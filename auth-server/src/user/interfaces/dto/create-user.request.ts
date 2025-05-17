import {
  ArrayNotEmpty,
  IsArray,
  IsEmail,
  IsEnum,
  IsNotEmpty,
} from 'class-validator';
import { UserRole } from '@/shared/enums/user-role.enum';
import { CreateUserDto } from '@/user/application/dto/create-user.dto';
import { IsPassword } from '@/shared/decorators/is-password.decorator';

export class CreateUserRequest {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  name: string;

  @IsPassword()
  password: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsEnum(UserRole, { each: true })
  roles: UserRole[];

  toDto(): CreateUserDto {
    const dto = new CreateUserDto();
    dto.email = this.email;
    dto.name = this.name;
    dto.rawPassword = this.password;
    dto.roles = this.roles;
    return dto;
  }
}
