import { CallHandler, ExecutionContext, Injectable, NestInterceptor, HttpException } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, any> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next
      .handle()
      .pipe(
        map(data => ({
          statusCode: context.switchToHttp().getResponse().statusCode,
          data,
          message: 'Success',
          error: null,
        })),
        // catchError((err) => {
        //   let error = err;
        //   let message = 'An error occurred';
        //   if (err instanceof HttpException) {
        //     error = err.getResponse();
        //     message = err.message;
        //   }
        //   return throwError(() => ({
        //     statusCode: context.switchToHttp().getResponse().statusCode,
        //     data: null,
        //     msg: message,
        //     error,
        //   }));
        // }),
      );
  }
}