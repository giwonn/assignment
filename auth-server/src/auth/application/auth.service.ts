import { Injectable } from '@nestjs/common';
import { LoginDto } from '@/auth/application/dto/login.dto';
import { HashLib } from '@/shared/libs/hash.lib';
import { UserRepository } from '@/user/domain/user.repository';
import { LoginFailedException } from '@/auth/auth.exception';
import { JwtLib } from '@/shared/libs/jwt.lib';
import { UserPayload } from '@/shared/types/login-payload.interface';
import { LoginResult } from '@/auth/application/dto/login.result';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashLib: HashLib,
    private readonly jwtLib: JwtLib,
  ) {}

  async login(dto: LoginDto): Promise<LoginResult> {
    // 1. 로그인 시도한 이메일로 유저를 찾는다.
    const user = await this.userRepository.findByEmail(dto.email);
    if (!user) throw new LoginFailedException();

    // 2. 입력한 비밀번호가 맞는지 확인한다.
    const isMatched = await this.hashLib.compare(
      dto.rawPassword,
      user.hashedPassword,
    );
    if (!isMatched) throw new LoginFailedException();

    // 3. 이메일, 비밀번호 둘 다 검증되면 JWT 토큰을 발급한다.
    const payload: UserPayload = {
      email: user.email,
      roles: user.roles,
    };

    // 4. JWT 토큰을 발급한다.
    return LoginResult.of({
      accessToken: this.jwtLib.sign(payload, { expiresIn: '5m' }),
    });
  }
}
