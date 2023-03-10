import { Injectable } from '@nestjs/common';

@Injectable()
export class MainService {
  async estimate() {
    return 200;
  }
}
