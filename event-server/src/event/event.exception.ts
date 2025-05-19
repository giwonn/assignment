import { HttpException, HttpStatus } from '@nestjs/common';

export class UserEventProgressIsNotCompletedException extends HttpException {
  constructor() {
    super('Event progress is not completed.', HttpStatus.BAD_REQUEST);
  }
}

export class UserEventProgressNotFoundException extends HttpException {
  constructor() {
    super('User event progress not found.', HttpStatus.BAD_REQUEST);
  }
}

export class UserEventProgressAlreadyExistsException extends HttpException {
  constructor() {
    super('User event progress Already Exists.', HttpStatus.CONFLICT);
  }
}

export class RewardAlreadyClaimedExistsException extends HttpException {
  constructor() {
    super('Reward already claimed.', HttpStatus.CONFLICT);
  }
}
