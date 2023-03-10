import { OnQueueActive, Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { Knex } from 'knex';
import { InjectConnection } from 'nest-knexjs';
import Table from 'src/constants/table';
import { Task } from './task';
import { TaskJob } from './task_job';

@Processor('tasks')
export class LongerTasksProcessor {
  constructor(@InjectConnection() private readonly db: Knex) { }

  @Process()
  async process(job: Job<TaskJob>) {
    await this.db<Task>(Table.TASKS).insert({
      user_id: job.data.user_id,
      estimated_time: job.data.estimation,
    });
  }

  @OnQueueActive()
  onActive(job: Job) {
    console.log(`Processing job ${job.id} of type ${job.name}`);
  }
}
