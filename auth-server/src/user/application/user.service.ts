import { ConflictException, Injectable } from '@nestjs/common';
import { UserRepository } from '@/user/domain/user.repository';
import { CreateUserDto } from '@/user/application/dto/create-user.dto';
import { HashLib } from '@/shared/libs/hash.lib';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashLib: HashLib,
  ) {}

  async create(dto: CreateUserDto): Promise<void> {
    const existingUser = await this.userRepository.findByEmail(dto.email);
    if (existingUser) throw new ConflictException('Email already exists');

    const hashedPassword = await this.hashLib.hash(dto.rawPassword);
    await this.userRepository.create(dto.toEntity(hashedPassword));
  }
}
