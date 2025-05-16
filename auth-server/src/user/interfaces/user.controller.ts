import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from '@/user/application/user.service';
import { CreateUserRequest } from '@/user/interfaces/dto/create-user.request';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() request: CreateUserRequest): Promise<void> {
    await this.userService.create(request.toDto());
  }
}
