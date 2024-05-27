import { CallHandler, ExecutionContext, Injectable, NestInterceptor, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
