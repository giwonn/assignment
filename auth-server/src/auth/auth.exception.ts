import { HttpException, HttpStatus } from '@nestjs/common';

export class LoginFailedException extends HttpException {
  constructor() {
    super('Invalid id or password.', HttpStatus.BAD_REQUEST);
  }
}
