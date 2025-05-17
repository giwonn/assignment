import { IsEmail } from 'class-validator';
import { IsPassword } from '@/shared/decorators/is-password.decorator';
import { LoginDto } from '@/auth/application/dto/login.dto';

export class LoginRequest {
  @IsEmail()
  email: string;

  @IsPassword()
  password: string;

  toDto(): LoginDto {
    const dto = new LoginDto();
    dto.email = this.email;
    dto.rawPassword = this.password;
    return dto;
  }
}
