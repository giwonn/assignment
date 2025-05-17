import { Module } from '@nestjs/common';
import { AuthService } from '@/auth/application/auth.service';
import { AuthController } from '@/auth/interfaces/auth.controller';
import { UserModule } from '@/user/user.module';

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
