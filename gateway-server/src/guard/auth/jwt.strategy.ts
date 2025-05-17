import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from './jwt-payload.interface';
import { CurrentUserPayload } from '@/common/interfaces/current-user-payload.interface';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    const secretKey = configService.get<string>('JWT_SECRET');
    if (!secretKey) {
      // TODO: 이거 예외 추상화해야할듯?
      throw new Error('JWT_SECRET is not defined');
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: secretKey,
    });
  }

  validate(payload: JwtPayload): CurrentUserPayload {
    return { userId: payload.sub, roles: payload.roles };
  }
}
