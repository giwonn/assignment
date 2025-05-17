import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JsonWebTokenError, JwtService, TokenExpiredError } from '@nestjs/jwt';

@Injectable()
export class JwtLib {
  constructor(private readonly jwtService: JwtService) {}

  sign(payload: Record<string, any>, options: { expiresIn: string }) {
    return this.jwtService.sign(payload, options);
  }

  verify<T extends object>(token: string): T {
    try {
      return this.jwtService.verify<T>(token);
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new UnauthorizedException('Token Expired');
      } else if (error instanceof JsonWebTokenError) {
        throw new UnauthorizedException('Invalid Token');
      } else {
        throw new UnauthorizedException('Invalid Token');
      }
    }
  }
}
