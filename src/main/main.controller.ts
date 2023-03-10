import { Controller, Get } from '@nestjs/common';
import { MainService } from './main.service';

@Controller()
export class MainController {
  constructor(private readonly mainService: MainService) { }

  @Get('/estimation')
  async main(): Promise<number> {
    // NOTE: `user_id` would come from the authorization header (a token)
    return this.mainService.estimate({ user_id: 1 });
  }
}
