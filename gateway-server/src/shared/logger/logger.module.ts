import { Global, Module } from '@nestjs/common';
import { SimpleLogger } from '@/shared/logger/simple.logger';
import { CustomLogger } from '@/shared/logger/custom.logger';

@Global()
@Module({
  providers: [
    {
      provide: CustomLogger,
      useClass: SimpleLogger,
    },
  ],
  exports: [CustomLogger],
})
export class LoggerModule {}
