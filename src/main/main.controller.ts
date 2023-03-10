import { Controller, Get } from '@nestjs/common';
import { MainService } from './main.service';

@Controller()
export class MainController {
  constructor(private readonly mainService: MainService) { }

  @Get('/estimation')
  async main(): Promise<number> {
    return this.mainService.estimate();
  }
}
