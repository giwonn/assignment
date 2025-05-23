import { Module } from '@nestjs/common';
import { JwtStrategy } from '@/shared/guard/auth/jwt.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [PassportModule],
  providers: [JwtStrategy],
})
export class GuardModule {}
