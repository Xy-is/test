import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Logger } from './logger.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly logger: Logger) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    const method = request.method;
    const path = request.path;
    const body = request.body;
    const startTime = Date.now();

    response.locals = response.locals || {};

    return next.handle().pipe(
      tap(
        (responseBody) => {
          const statusCode = response.statusCode;
          const duration = Date.now() - startTime;

          this.logger.logApi({
            method,
            path,
            request: body,
            response: responseBody,
            statusCode,
            duration: `${duration}ms`,
          });
        },
        (error) => {
          const statusCode = error.status || HttpStatus.INTERNAL_SERVER_ERROR;
          const duration = Date.now() - startTime;

          this.logger.error({
            method,
            path,
            request: body,
            error: error.message,
            statusCode,
            duration: `${duration}ms`,
          });
        },
      ),
    );
  }
}
