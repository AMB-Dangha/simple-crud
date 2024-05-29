import { Catch, ArgumentsHost, HttpException, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    // const request = ctx.getRequest();
    
    const status = exception instanceof HttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;
    
    const message = exception instanceof HttpException
      ? exception.getResponse()
      : { message: 'Internal server error' };

    const errorResponse = {
      statusCode: status,
      data: null,
      message: null,
      error: (typeof message === 'string' ? message : (message as any).message) || 'Internal server error',
      // timestamp: new Date().toISOString(),
      // path: request.url,
    };
    response.status(status).json(errorResponse);
  }
}