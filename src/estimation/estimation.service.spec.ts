import { Test, TestingModule } from '@nestjs/testing';
import { EstimationService } from './estimation.service';

describe('EstimationService', () => {
  let service: EstimationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EstimationService],
    }).compile();

    service = module.get<EstimationService>(EstimationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return a number between 1 and 10000', () => {
    const estimation = service.getEstimation();
    expect(estimation >= 1 && estimation <= 10000).toBeTruthy();
  });
});
