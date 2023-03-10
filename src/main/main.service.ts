import { Injectable } from '@nestjs/common';
import { EstimationService } from 'src/estimation/estimation.service';

@Injectable()
export class MainService {
  constructor(private readonly estimationService: EstimationService) { }

  async estimate() {
    const value = this.estimationService.getEstimation();

    if (value <= 500) {
      return value;
    }

    return -1;
  }
}
