import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { CurrentUserPayload } from '@/shared/interfaces/current-user-payload.interface';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    const secretKey = configService.get<string>('JWT_SECRET_KEY');
    if (!secretKey) {
      throw new UnauthorizedException('JWT_SECRET_KEY is not defined');
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: secretKey,
    });
  }

  validate(payload: CurrentUserPayload): CurrentUserPayload {
    return { sub: payload.sub, roles: payload.roles };
  }
}
