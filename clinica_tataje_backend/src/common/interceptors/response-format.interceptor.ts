import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Observable, catchError, map, throwError } from 'rxjs';

@Injectable()
export class ResponseFormatInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => ({
        status: 'success',
        message: 'Operación exitosa',
        data,
      })),
      catchError((err) => {
        const statusCode = err?.status || HttpStatus.INTERNAL_SERVER_ERROR;
        const message = err?.message || 'Error inesperado';

        return throwError(
          () =>
            new HttpException(
              {
                status: 'error',
                message,
                data: null,
              },
              statusCode,
            ),
        );
      }),
    );
  }
}
