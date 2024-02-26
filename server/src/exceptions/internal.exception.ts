import { HttpStatus } from '@nestjs/common';
import { BaseException } from './base.exception';
import { ExceptionCodeEnum } from './exception.enum';

/**
 * 서버 내부 오류
 */
export class InternalException extends BaseException {
	constructor(errorMessage?: string) {
		super(ExceptionCodeEnum.InternalServerError, HttpStatus.INTERNAL_SERVER_ERROR, errorMessage);
	}
}
