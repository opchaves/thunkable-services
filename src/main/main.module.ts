import { Module } from '@nestjs/common';
import { EstimationModule } from 'src/estimation/estimation.module';
import { MainController } from './main.controller';
import { MainService } from './main.service';

@Module({
  controllers: [MainController],
  providers: [MainService],
  imports: [EstimationModule],
})
export class MainModule { }
