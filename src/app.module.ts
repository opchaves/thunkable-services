import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { KnexModule } from 'nest-knexjs';
import { MainModule } from './main/main.module';
import { EstimationModule } from './estimation/estimation.module';
import { LongerTasksModule } from './longer_tasks/longer_tasks.module';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    KnexModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        config: {
          client: 'pg',
          debug: true,
          connection: configService.getOrThrow('DATABASE_URL'),
          pool: { min: 2, max: 10 },
        },
      }),
      inject: [ConfigService],
    }),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        redis: {
          host: configService.getOrThrow('REDIS_HOST'),
          port: configService.getOrThrow('REDIS_PORT'),
        },
      }),
      inject: [ConfigService],
    }),
    BullModule.registerQueue({ name: 'tasks' }),
    MainModule,
    EstimationModule,
    LongerTasksModule,
  ],
})
export class AppModule { }
