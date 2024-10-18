import { Module } from '@nestjs/common';
import { ClientModule } from '../client/client.module';
import { TaskModule } from '../task/task.module';
import { LoggerModule } from '../logger/logger.module';

@Module({
  imports: [ClientModule, TaskModule, LoggerModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
