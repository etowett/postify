import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHealthz(): Record<string, any> {
    return { message: 'Healthy!', status: 'OK' };
  }
}
