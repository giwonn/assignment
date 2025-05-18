import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class IgnoreStaticRequestMiddleware implements NestMiddleware {
  private readonly staticPath = new Set(['/favicon.ico', '/robots.txt']);

  use(req: Request, res: Response, next: NextFunction) {
    if (this.staticPath.has(req.originalUrl.split('?')[0])) {
      return res.status(204).end();
    }
    next();
  }
}
