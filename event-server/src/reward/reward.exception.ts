import { HttpException, HttpStatus } from '@nestjs/common';

export class RewardNotFoundException extends HttpException {
  constructor() {
    super('Reward not found.', HttpStatus.BAD_REQUEST);
  }
}

export class RewardAlreadyExistsException extends HttpException {
  constructor() {
    super('Reward already exists.', HttpStatus.CONFLICT);
  }
}
