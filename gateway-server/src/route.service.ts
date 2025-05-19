import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RouteService {
  private readonly routes: Record<string, string>;

  constructor(private readonly configService: ConfigService) {
    this.routes = {
      auth: this.configService.getOrThrow<string>('AUTH_SERVICE_URL'),
      users: this.configService.getOrThrow<string>('AUTH_SERVICE_URL'),
      events: this.configService.getOrThrow<string>('EVENT_SERVICE_URL'),
      rewards: this.configService.getOrThrow<string>('EVENT_SERVICE_URL'),
    };
  }

  getUrl(path: string): string {
    if (!this.routes[path]) throw new NotFoundException('Route not found');
    return this.routes[path];
  }
}
