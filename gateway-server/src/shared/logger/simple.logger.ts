import { Injectable } from '@nestjs/common';
import { CustomLogger } from '@/shared/logger/custom.logger';

@Injectable()
export class SimpleLogger implements CustomLogger {
  log(message: any, context?: string): void {
    console.log(this.format('LOG', message, context));
  }

  error(message: any, trace?: string, context?: string): void {
    console.error(this.format('ERROR', message, context));
    if (trace) console.error(trace);
  }

  warn(message: any, context?: string): void {
    console.warn(this.format('WARN', message, context));
  }

  private format(level: string, message: any, context?: string): string {
    const timestamp = new Date().toISOString();
    const ctx = context ? `[${context}]` : '';
    return `${timestamp} [${level}] ${ctx} ${message}`;
  }
}
