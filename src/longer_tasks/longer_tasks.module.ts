import { Module } from '@nestjs/common';
import { LongerTasksProcessor } from './longer_tasks.processor';

@Module({
  providers: [LongerTasksProcessor],
})
export class LongerTasksModule { }
