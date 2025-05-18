// roles.guard.ts
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Request } from 'express';
import { roleAccessPolicy } from '@/shared/guard/role/role-access.policy';
import { CurrentUserPayload } from '@/shared/interfaces/current-user-payload.interface';
import { CustomLogger } from '@/shared/logger/custom.logger';

interface JwtGuardPassedRequest extends Request {
  user: CurrentUserPayload;
}

@Injectable()
export class RoleGuard implements CanActivate {
  private readonly roleExceptionMessage =
    'Do not have role to access this resource';

  constructor(private readonly customLogger: CustomLogger) {}

  canActivate(context: ExecutionContext): boolean {
    const { path, method, user } = context
      .switchToHttp()
      .getRequest<JwtGuardPassedRequest>();

    // 요청한 api가 roleAccessPolicy에 null로 정의되어 있으면 Guard 통과
    const requiredRoles = roleAccessPolicy[path]?.[method];
    if (requiredRoles === null) return true;

    // 요청한 api가 roleAccessPolicy에 정의되어 있지 않으면 누락으로 간주하고 ForbiddenException 발생
    if (requiredRoles === undefined) {
      this.customLogger.warn(
        `${path} ${method} is not defined in roleAccessPolicy.`,
      );
      throw new ForbiddenException(this.roleExceptionMessage);
    }

    // Role은 Jwt의 role로 검증하기 때문에 jwtAuthGuard가 먼저 실행되어야 함
    if (!user) {
      this.customLogger.warn('RoleGuard must be executed after JwtAuthGuard.');
      throw new ForbiddenException(this.roleExceptionMessage);
    }

    // 유저가 요청에 필요한 role이 없으면 ForbiddenException 발생
    const hasRequiredRole = requiredRoles?.some((role) =>
      user.roles.includes(role),
    );
    if (!hasRequiredRole) {
      throw new ForbiddenException(this.roleExceptionMessage);
    }

    // 유저가 요청에 필요한 role이 있으면 Guard 통과
    return true;
  }
}
