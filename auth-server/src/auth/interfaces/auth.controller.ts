import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from '@/auth/application/auth.service';
import { LoginRequest } from '@/auth/interfaces/dto/login.request';
import { LoginResponse } from '@/auth/interfaces/dto/login.response';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() request: LoginRequest): Promise<LoginResponse> {
    const result = await this.authService.login(request.toDto());
    return LoginResponse.from(result);
  }
}
