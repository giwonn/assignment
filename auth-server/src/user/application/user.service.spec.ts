import { UserService } from './user.service';
import { UserRepository } from '@/user/domain/user.repository';
import { User } from '@/user/domain/user.entity';
import { CreateUserDto } from '@/user/application/dto/create-user.dto';
import { ConflictException } from '@nestjs/common';
import { HashLib } from '@/shared/libs/hash.lib';

describe('UserService', () => {
  let userService: UserService;
  let userRepository: jest.Mocked<UserRepository>;
  let hashLib: jest.Mocked<HashLib>;

  beforeEach(() => {
    userRepository = {
      findByEmail: jest.fn(),
      create: jest.fn(),
    };
    hashLib = {
      hash: jest.fn(),
    };

    userService = new UserService(userRepository, hashLib);
  });

  describe('유저 생성', () => {
    it('성공', async () => {
      // given
      const dto = new CreateUserDto();
      dto.email = 'test@gmail.com';
      dto.rawPassword = 'testPassword';
      userRepository.findByEmail.mockResolvedValue(null);

      // when
      await userService.create(dto);
    });

    it('실패 - 이미 존재하는 유저', async () => {
      // given
      const dto = new CreateUserDto();
      userRepository.findByEmail.mockResolvedValue(new User());

      // when
      await expect(userService.create(dto)).rejects.toThrow(ConflictException);
    });
  });
});
