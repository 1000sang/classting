import { HttpException } from '@nestjs/common';
import { IBaseException } from './base.exception.interface';
import { ApiProperty } from '@nestjs/swagger';

/**
 * 오류 정의
 */

export class BaseException extends HttpException {
  constructor(errorCode: string, statusCode: number, errorMessage?: string) {
    super(
      HttpException.createBody(
        errorMessage ? `[${errorCode}] ${errorMessage}` : errorCode,
        errorCode,
        statusCode,
      ),
      statusCode,
      undefined,
    );

    this.errorCode = errorCode;
    this.statusCode = statusCode;
    this.errorMessage = errorMessage;
  }

  errorCode: string = '';

  statusCode: number = 0;

  timestamp: string = '';

  errorMessage?: string;

  path: string = '';
}
