import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { authWhitelistPolicy } from '@/shared/guard/auth/auth-whitelist.policy';
import type { Request } from 'express';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>();
    const { path, method } = request;

    if (authWhitelistPolicy[path]?.includes(method)) return true;
    return super.canActivate(context);
  }

  handleRequest(err: any, user: any): any {
    if (err || !user) {
      throw new UnauthorizedException('Login Required');
    }

    return user;
  }
}
