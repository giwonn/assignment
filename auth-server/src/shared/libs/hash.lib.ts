import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';

@Injectable()
export class HashLib {
  async hash(plainText: string, saltOrRounds: number = 10): Promise<string> {
    return await bcrypt.hash(plainText, saltOrRounds);
  }
}
