/* eslint-disable prettier/prettier */
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  status: number;
  data?: T;
  message?: any;
  success: boolean;
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    const res: Request = context.switchToHttp().getResponse();
    const request: Request = context.switchToHttp().getRequest();
    const method = request.method;
    return next.handle().pipe(
      map((data) => {
        const response: Response<T> = {
          success: false,
          status: res.statusCode,
        };
        if (typeof data === 'string') {
          response.message = data;
          response.success = true;
        } else if (typeof data === 'object') {
          if (method === 'GET') {
            // check if the data has many records
            const emptyObject =
              data &&
              Object.keys(data).length === 0 &&
              Object.getPrototypeOf(data) === Object.prototype;
            const hasMany =
              !emptyObject && data.hasOwnProperty('totalItems') ? true : false;
            response.message = `${
              hasMany ? data.totalItems : emptyObject ? 0 : 1
            } item${hasMany && data.totalItems > 1 ? 's' : ''} found.`;
          }
          if (method === 'GET') {
            response.message = ['Data Fetched successfully!'];
            response.success = true;
          }
          if (method === 'POST') {
            response.message = ['Data added successfully!'];
            response.success = true;
          }
          if (method === 'PATCH') {
            response.message = ['Data updated successfully!'];
            response.success = true;
          }
          if (method === 'DELETE') {
            response.message = ['Data deleted successfully!'];
            response.success = true;
          }
          response.data = data;
        }
        return response;
      }),
    );
  }
}
