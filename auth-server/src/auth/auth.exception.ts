import { HttpException, HttpStatus } from '@nestjs/common';

export class LoginFailedException extends HttpException {
  constructor() {
    super('아이디 또는 비밀번호가 일치하지 않습니다.', HttpStatus.BAD_REQUEST);
  }
}
