import {
  Controller,
  All,
  Req,
  Res,
  InternalServerErrorException,
  UseGuards,
} from '@nestjs/common';
import { ProxyService } from '@/proxy.service';
import { Request, Response } from 'express';
import { RoleGuard } from '@/shared/guard/role/role.guard';
import { JwtAuthGuard } from '@/shared/guard/auth/jwt-auth.guard';
import { CurrentUser } from '@/shared/decorators/current-user.decorator';
import { CurrentUserPayload } from '@/shared/interfaces/current-user-payload.interface';

@Controller()
export class ProxyController {
  constructor(private readonly proxyService: ProxyService) {}

  @UseGuards(JwtAuthGuard, RoleGuard)
  @All('*')
  async proxy(
    @Req() req: Request,
    @Res() res: Response,
    @CurrentUser() user: CurrentUserPayload | undefined,
  ) {
    try {
      const response = await this.proxyService.proxy(req, user);

      const headers = { ...response.headers };
      delete headers['server'];
      delete headers['x-powered-by'];

      res.status(response.status).set(headers).send(response.data);
    } catch (error) {
      console.error('Proxy error:', error);
      throw new InternalServerErrorException();
    }
  }
}
