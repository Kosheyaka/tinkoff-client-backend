import { Injectable } from '@nestjs/common';

@Injectable()
export class DevService {
  getHello(): string {
    return 'Hello World!';
  }
}
