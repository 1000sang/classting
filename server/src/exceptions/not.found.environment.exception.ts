import { HttpStatus } from '@nestjs/common';
import { BaseException } from './base.exception';
import { ExceptionCodeEnum } from './exception.enum';

/**
 * 환경변수값을 찾지 못한경우
 */
export class NotFoundEnvironmentException extends BaseException {
  constructor(errorMessage?: string) {
    super(
        ExceptionCodeEnum.NotFoundEnvironment,
        HttpStatus.NOT_FOUND,
        errorMessage,
    );
  }
}
