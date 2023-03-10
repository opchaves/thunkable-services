import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { EstimationService } from 'src/estimation/estimation.service';
import { TaskJob } from 'src/longer_tasks/task_job';

@Injectable()
export class MainService {
  constructor(
    @InjectQueue('tasks') private tasksQueue: Queue,
    private readonly estimationService: EstimationService,
  ) { }

  async estimate({ user_id }: { user_id: number }) {
    const estimation = this.estimationService.getEstimation();

    if (estimation <= 500) {
      return estimation;
    }

    const job = await this.addToQueue({ estimation, user_id });

    console.log(`Job #${job.id} added to "tasks" queue`);

    return -1;
  }

  async addToQueue(data: TaskJob) {
    return await this.tasksQueue.add(data, { delay: data.estimation });
  }
}
