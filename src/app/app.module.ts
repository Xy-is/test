import { Module } from '@nestjs/common';
import { ClientModule } from '../client/client.module';
import { TaskModule } from '../task/task.module';

@Module({
  imports: [ClientModule, TaskModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
