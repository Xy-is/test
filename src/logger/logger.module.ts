import { Global, Module } from '@nestjs/common';
import { LoggingInterceptor } from './logger.interceptor';
import { Logger } from './logger.service';

@Global()
@Module({
  providers: [Logger, LoggingInterceptor],
  exports: [Logger, LoggingInterceptor],
})
export class LoggerModule {}
