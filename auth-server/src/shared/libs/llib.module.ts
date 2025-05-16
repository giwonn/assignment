import { Global, Module } from '@nestjs/common';
import { HashLib } from '@/shared/libs/hash.lib';

const libraries = [HashLib];

@Global()
@Module({
  providers: libraries,
  exports: libraries,
})
export class LibModule {}
