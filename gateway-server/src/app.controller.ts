import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('auth')
  async getAuth(): Promise<string> {
    return await this.appService.getAuth();
  }

  @Get('event')
  async getEvent(): Promise<string> {
    return await this.appService.getEvent();
  }
}
