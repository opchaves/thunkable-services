import { Injectable } from '@nestjs/common';

@Injectable()
export class EstimationService {
  getEstimation() {
    return Math.floor(Math.random() * 10000) + 1;
  }
}
