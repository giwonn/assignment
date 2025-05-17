import { PartialType } from '@nestjs/mapped-types';
import { LoginRequest } from './login.request';

export class UpdateAuthDto extends PartialType(LoginRequest) {}
