import { CallHandler, ExecutionContext, Injectable, NestInterceptor, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}


@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
  private readonly logger = new Logger(ErrorsInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((err) => {
        let customError;
        if (err instanceof HttpException) {
          // Handle known HTTP exceptions
          customError = {
            statusCode: err.getStatus(),
            message: err.getResponse(),
          };
        } else {
          // Handle unknown exceptions
          this.logger.error('Unexpected error', err.stack);
          customError = {
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: 'An unexpected error occurred',
            error: err.message,
          };
        }
        return throwError(() => customError);
      }),
    );
  }
}