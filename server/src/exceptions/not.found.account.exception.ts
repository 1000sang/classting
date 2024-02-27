/* istanbul ignore file */
import { HttpStatus } from '@nestjs/common';
import { BaseException } from './base.exception';
import { ExceptionCodeEnum } from './exception.enum';

/**
 * 유저를 찾지 못한경우
 */
export class NotFoundAccountException extends BaseException {
	constructor(errorMessage?: string) {
		super(ExceptionCodeEnum.AccountNotFound, HttpStatus.NOT_FOUND, errorMessage);
	}
}
