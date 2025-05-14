import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AppService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  getHello(): string {
    return 'Gateway-server is running';
  }

  async getAuth(): Promise<string> {
    const authUrl = this.configService.get<string>(
      'AUTH_SERVICE_URL',
      'http://localhost:3001',
    );

    const res = await firstValueFrom(this.httpService.get<string>(authUrl));
    return res.data;
  }

  async getEvent(): Promise<string> {
    const eventUrl = this.configService.get<string>(
      'EVENT_SERVICE_URL',
      'http://localhost:3002',
    );

    const res = await firstValueFrom(this.httpService.get<string>(eventUrl));
    return res.data;
  }
}
