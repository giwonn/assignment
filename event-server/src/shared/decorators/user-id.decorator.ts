import {
  createParamDecorator,
  ExecutionContext,
  NotFoundException,
} from '@nestjs/common';
import { Request } from 'express';

export const UserId = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): string => {
    const request = ctx.switchToHttp().getRequest<Request>();
    const userId = request.headers['x-user-id'];
    if (typeof userId !== 'string' || userId.trim() === '') {
      throw new NotFoundException('User ID not found or invalid');
    }
    return userId;
  },
);
