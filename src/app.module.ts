import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { KnexModule } from 'nest-knexjs';
import { MainModule } from './main/main.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    KnexModule.forRoot({
      config: {
        client: 'pg',
        debug: true,
        connection: process.env.DATABASE_URL,
        pool: { min: 0, max: 7, idleTimeoutMillis: 300_000 },
      },
    }),
    MainModule,
  ],
})
export class AppModule { }
