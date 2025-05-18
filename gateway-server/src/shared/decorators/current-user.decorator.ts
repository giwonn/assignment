import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { CurrentUserPayload } from '@/shared/interfaces/current-user-payload.interface';

export const CurrentUser = createParamDecorator((_, ctx: ExecutionContext) => {
  const request = ctx
    .switchToHttp()
    .getRequest<Request & { user?: CurrentUserPayload }>();
  return request.user;
});
