import { Injectable } from '@nestjs/common';
import { RouteService } from '@/route.service';
import { HttpService } from '@nestjs/axios';
import { Request } from 'express';
import { lastValueFrom } from 'rxjs';
import { CurrentUserPayload } from '@/shared/interfaces/current-user-payload.interface';

@Injectable()
export class ProxyService {
  constructor(
    private readonly routeService: RouteService,
    private readonly httpService: HttpService,
  ) {}

  async proxy(req: Request, user: CurrentUserPayload | undefined) {
    const prefix = req.path.split('/')[1];
    const baseUrl = this.routeService.getUrl(prefix);
    const targetUrl = `${baseUrl}${req.originalUrl}`;

    const headers = {
      'content-Type': req.headers['content-type'],
    };
    if (user) {
      headers['x-user-id'] = user.sub;
    }

    const response = this.httpService.request({
      url: targetUrl,
      method: req.method,
      headers,
      data: req.body as Record<string, any>,
      params: req.query,
      validateStatus: () => true, // 어떤 상태코드든 무조건 성공으로 간주
    });

    return lastValueFrom(response);
  }
}
